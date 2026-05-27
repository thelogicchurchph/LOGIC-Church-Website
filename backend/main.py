from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi.security import OAuth2PasswordBearer
import models, schemas, auth, database
import os, shutil
from datetime import timedelta
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

load_dotenv()

# Cloudinary Configuration
# The SDK can parse CLOUDINARY_URL natively via the cloudinary_url parameter.
# Using urllib to parse it manually breaks when the API secret contains special characters.
cloudinary_url = os.getenv("CLOUDINARY_URL")
if cloudinary_url:
    cloudinary.config(cloudinary_url=cloudinary_url)
else:
    cloudinary.config(
        cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET"),
        secure=True
    )

models.Base.metadata.create_all(bind=database.engine)

# Database schema patch: ensure 'order' column exists in gallery_images
try:
    with database.engine.begin() as conn:
        conn.execute(text('ALTER TABLE gallery_images ADD COLUMN "order" INTEGER DEFAULT 0'))
except Exception:
    # Column already exists or table doesn't exist
    pass

# Database schema patch: ensure 'createdAt' is renamed to 'created_at' for comments
try:
    with database.engine.begin() as conn:
        # This resolves an issue where the postgres database had a legacy column name
        conn.execute(text('ALTER TABLE comments RENAME COLUMN "createdAt" TO created_at'))
except Exception:
    # Column already renamed or doesn't exist
    pass

app = FastAPI(title="Logic Church API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    # Automatically ensure admin user is correctly hashed on startup
    db = database.SessionLocal()
    try:
        # DB Migration Hack: Add category column if missing
        try:
            db.execute(text("ALTER TABLE questions ADD COLUMN category VARCHAR DEFAULT 'General'"))
            db.commit()
        except Exception:
            db.rollback()

        admin_email = "admin@logic.church"
        admin_user = db.query(models.User).filter(models.User.email == admin_email).first()
        if admin_user:
            # Update password to ensure it's hashed with the new bcrypt logic
            admin_user.hashed_password = auth.get_password_hash("admin123")
            admin_user.role = "admin"
            db.commit()
        else:
            # Create if missing
            new_admin = models.User(
                name="Administrator",
                email=admin_email,
                hashed_password=auth.get_password_hash("admin123"),
                role="admin"
            )
            db.add(new_admin)
            db.commit()
    finally:
        db.close()

# Ensure uploads directory exists
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = auth.jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except auth.JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# ── Auth ────────────────────────────────────────────────────────────────────

@app.post("/auth/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        role="user"
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/auth/login")
def login(request: schemas.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user or not auth.verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = auth.create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {
        "access_token": access_token,
        "token": access_token,
        "token_type": "bearer",
        "admin": fmt_user(user)
    }

@app.get("/user/profile")
def get_user_profile(current_user: models.User = Depends(get_current_user)):
    return {"user": fmt_user(current_user)}

@app.get("/users", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough privileges")
    return db.query(models.User).all()

@app.post("/admin/users", response_model=schemas.UserResponse)
def create_admin_user(user: schemas.AdminUserCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough privileges")
        
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/admin/users/{user_id}")
def delete_admin_user(user_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough privileges")
        
    if current_user.id == user_id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
        
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}

@app.get("/admin/stats")
def get_admin_stats(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    user_count = db.query(models.User).count()
    event_count = db.query(models.Event).count()
    gallery_count = db.query(models.GalleryImage).count()
    post_count = db.query(models.Question).count()
    
    return {
        "users": user_count,
        "events": event_count,
        "gallery": gallery_count,
        "posts": post_count
    }

# ── Forum: Questions ────────────────────────────────────────────────────────

def fmt_user(u):
    if not u:
        return None
    parts = u.name.split(" ", 1)
    return {"id": u.id, "firstName": parts[0], "lastName": parts[1] if len(parts) > 1 else "", "name": u.name}

def fmt_comment(c):
    return {
        "id": c.id,
        "body": c.body,
        "createdAt": c.created_at.isoformat() if c.created_at else None,
        "author": fmt_user(c.author),
        "parent_id": c.parent_id,
        "replies": [fmt_comment(r) for r in (c.replies or [])]
    }

def fmt_question(q, current_user=None, full=False):
    amens_count = len(q.amened_by) if hasattr(q, "amened_by") and q.amened_by else 0
    has_amened = current_user in q.amened_by if current_user and hasattr(q, "amened_by") else False
    
    # Only include top-level comments (those without a parent)
    top_level_comments = [c for c in (q.comments or []) if c.parent_id is None]
    
    data = {
        "id": q.id,
        "title": q.title,
        "body": q.body,
        "category": getattr(q, 'category', 'General') or 'General',
        "amens": amens_count,
        "hasAmened": has_amened,
        "createdAt": q.created_at.isoformat() if q.created_at else None,
        "author": fmt_user(q.author),
        "comments": [fmt_comment(c) for c in top_level_comments] if full else [{"id": c.id} for c in (q.comments or [])],
    }
    return data

@app.get("/questions")
def get_questions(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    questions = db.query(models.Question).order_by(models.Question.created_at.desc()).all()
    return [fmt_question(q, current_user=current_user) for q in questions]

@app.post("/questions")
def create_question(payload: schemas.QuestionCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    q = models.Question(title=payload.title, body=payload.body, category=payload.category, author_id=current_user.id)
    db.add(q)
    db.commit()
    db.refresh(q)
    return {"question": fmt_question(q, current_user=current_user)}

@app.put("/questions/{question_id}")
def update_question(question_id: int, payload: schemas.QuestionUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
        
    if q.author_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to edit this question")
        
    if payload.title is not None:
        q.title = payload.title
    if payload.body is not None:
        q.body = payload.body
    if payload.category is not None:
        q.category = payload.category
        
    db.commit()
    db.refresh(q)
    return {"question": fmt_question(q, current_user=current_user, full=True)}

@app.get("/questions/{question_id}")
def get_question(question_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    return {"question": fmt_question(q, current_user=current_user, full=True)}

@app.post("/questions/{question_id}/amen")
def toggle_amen(question_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    
    if current_user in q.amened_by:
        q.amened_by.remove(current_user)
        action = "removed"
    else:
        q.amened_by.append(current_user)
        action = "added"
        
    db.commit()
    return {"message": f"Amen {action}", "amens": len(q.amened_by)}

@app.post("/questions/{question_id}/comment")
def add_comment(question_id: int, payload: schemas.CommentCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    c = models.Comment(body=payload.body, author_id=current_user.id, question_id=question_id, parent_id=payload.parent_id)
    db.add(c)
    db.commit()
    db.refresh(c)
    return {
        "comment": {
            "id": c.id,
            "body": c.body,
            "createdAt": c.created_at.isoformat() if c.created_at else None,
            "author": fmt_user(current_user),
        }
    }

@app.delete("/questions/{question_id}")
def delete_question(question_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    
    if q.author_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to delete this question")
        
    # Manually delete all comments for this question to avoid constraint errors
    for c in db.query(models.Comment).filter(models.Comment.question_id == question_id).all():
        db.delete(c)
        
    db.delete(q)
    db.commit()
    return {"message": "Question deleted successfully"}

@app.put("/comments/{comment_id}")
def update_comment(comment_id: int, payload: schemas.CommentUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    c = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Comment not found")
        
    if c.author_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to edit this comment")
        
    c.body = payload.body
    db.commit()
    db.refresh(c)
    
    # Return the updated question
    q = db.query(models.Question).filter(models.Question.id == c.question_id).first()
    return {"question": fmt_question(q, current_user=current_user, full=True)}

def recursive_delete_comment(db, comment):
    for reply in comment.replies:
        recursive_delete_comment(db, reply)
    db.delete(comment)

@app.delete("/comments/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    c = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Comment not found")
        
    if c.author_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to delete this comment")
        
    question_id = c.question_id
    recursive_delete_comment(db, c)
    db.commit()
    
    # Return the updated question
    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    return {"question": fmt_question(q, current_user=current_user, full=True)}

# ── Events ──────────────────────────────────────────────────────────────────

@app.get("/events", response_model=list[schemas.EventResponse])
def get_events(db: Session = Depends(database.get_db)):
    return db.query(models.Event).order_by(models.Event.created_at.desc()).all()

@app.post("/events", response_model=schemas.EventResponse)
def create_event(event: schemas.EventCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    db_event = models.Event(**event.model_dump())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@app.put("/events/{event_id}", response_model=schemas.EventResponse)
def update_event(event_id: int, payload: schemas.EventUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    db_event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_event, key, value)
    
    db.commit()
    db.refresh(db_event)
    return db_event

@app.delete("/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    db_event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(db_event)
    db.commit()
    return {"message": "Event deleted successfully"}

# ── Gallery ────────────────────────────────────────────────────────────────

@app.get("/gallery", response_model=list[schemas.GalleryImageResponse])
def get_gallery(db: Session = Depends(database.get_db)):
    return db.query(models.GalleryImage).order_by(models.GalleryImage.order.asc(), models.GalleryImage.created_at.desc()).all()

@app.post("/gallery/reorder")
def reorder_gallery(payload: schemas.GalleryReorder, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    for index, image_id in enumerate(payload.image_ids):
        db.query(models.GalleryImage).filter(models.GalleryImage.id == image_id).update({"order": index})
    db.commit()
    return {"message": "Gallery reordered successfully"}

@app.post("/gallery/upload")
def upload_gallery_image(payload: schemas.GalleryImageCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    db_img = models.GalleryImage(image_url=payload.image_url)
    db.add(db_img)
    db.commit()
    db.refresh(db_img)
    return db_img

@app.delete("/gallery/{image_id}")
def delete_gallery_image(image_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    db_img = db.query(models.GalleryImage).filter(models.GalleryImage.id == image_id).first()
    if not db_img:
        raise HTTPException(status_code=404, detail="Image not found")
    db.delete(db_img)
    db.commit()
    return {"message": "Image deleted successfully"}

# ── General Upload ──────────────────────────────────────────────────────────

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), current_user: models.User = Depends(get_current_user)):
    try:
        # Read file bytes asynchronously — required in async context on production servers.
        # Passing file.file (SpooledTemporaryFile) directly to the sync Cloudinary SDK
        # can fail on Render due to event loop/file handle conflicts.
        contents = await file.read()
        
        result = cloudinary.uploader.upload(
            contents,
            folder="logic_church",
            use_filename=True,
            unique_filename=True,
            resource_type="auto"
        )
        return {"url": result.get("secure_url")}
    except Exception as e:
        # Print full error to Render logs so we can diagnose it
        import traceback
        print("UPLOAD ERROR:", str(e))
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# ── Site Settings ────────────────────────────────────────────────────────────

@app.get("/settings/featured-sermon")
def get_featured_sermon(db: Session = Depends(database.get_db)):
    setting = db.query(models.SiteSetting).filter(models.SiteSetting.key == "featured_sermon").first()
    if not setting:
        return {"value": "https://www.youtube.com/embed/VnE_prPrko8"} # default
    return {"value": setting.value}

@app.get("/admin/settings", response_model=list[schemas.SiteSettingResponse])
def get_admin_settings(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(models.SiteSetting).all()

@app.put("/admin/settings/{key}")
def update_admin_setting(key: str, payload: schemas.SiteSettingUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    setting = db.query(models.SiteSetting).filter(models.SiteSetting.key == key).first()
    if setting:
        setting.value = payload.value
    else:
        setting = models.SiteSetting(key=key, value=payload.value)
        db.add(setting)
    
    db.commit()
    db.refresh(setting)
    return setting

# ── Contact Forms ────────────────────────────────────────────────────────────

@app.post("/contact")
def submit_contact(payload: schemas.ContactMessageCreate, db: Session = Depends(database.get_db)):
    msg = models.ContactMessage(**payload.model_dump())
    db.add(msg)
    db.commit()
    return {"message": "Message sent successfully"}

@app.post("/talk-to-ppc")
def submit_talk_to_ppc(payload: schemas.TalkToPPCMessageCreate, db: Session = Depends(database.get_db)):
    msg = models.TalkToPPCMessage(**payload.model_dump())
    db.add(msg)
    db.commit()
    return {"message": "Message sent successfully"}

@app.get("/admin/messages/contact")
def get_contact_messages(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()

@app.get("/admin/messages/talk-to-ppc")
def get_talk_to_ppc_messages(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(models.TalkToPPCMessage).order_by(models.TalkToPPCMessage.created_at.desc()).all()
