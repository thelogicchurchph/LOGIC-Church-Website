from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi.security import OAuth2PasswordBearer
import models, schemas, auth, database
import os, shutil
from datetime import timedelta

models.Base.metadata.create_all(bind=database.engine)

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
        role=user.role
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
    # Simple check for admin role if needed, or just return all users for now
    return db.query(models.User).all()

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

def fmt_question(q, full=False):
    amens_count = len(q.amened_by) if hasattr(q, "amened_by") and q.amened_by else 0
    data = {
        "id": q.id,
        "title": q.title,
        "body": q.body,
        "category": getattr(q, 'category', 'General') or 'General',
        "amens": amens_count,
        "createdAt": q.created_at.isoformat() if q.created_at else None,
        "author": fmt_user(q.author),
        "comments": [fmt_comment(c) for c in (q.comments or [])] if full else [{"id": c.id} for c in (q.comments or [])],
    }
    return data

@app.get("/questions")
def get_questions(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    questions = db.query(models.Question).order_by(models.Question.created_at.desc()).all()
    return [fmt_question(q) for q in questions]

@app.post("/questions")
def create_question(payload: schemas.QuestionCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    q = models.Question(title=payload.title, body=payload.body, category=payload.category, author_id=current_user.id)
    db.add(q)
    db.commit()
    db.refresh(q)
    return {"question": fmt_question(q)}

@app.get("/questions/{question_id}")
def get_question(question_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    return {"question": fmt_question(q, full=True)}

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
    db.delete(q)
    db.commit()
    return {"message": "Question deleted successfully"}

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
    return db.query(models.GalleryImage).order_by(models.GalleryImage.created_at.desc()).all()

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
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    # Check if file exists and rename if necessary to avoid overwriting
    base, extension = os.path.splitext(file.filename)
    counter = 1
    while os.path.exists(file_path):
        file_path = os.path.join(UPLOAD_DIR, f"{base}_{counter}{extension}")
        counter += 1
        
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Return the full path relative to the backend root
    return {"url": f"/uploads/{os.path.basename(file_path)}"}
