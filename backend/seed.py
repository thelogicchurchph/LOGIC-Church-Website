from database import SessionLocal
from models import User
from auth import get_password_hash

db = SessionLocal()

# Check if admin exists
admin_user = db.query(User).filter(User.email == "admin@logic.church").first()
if not admin_user:
    db_user = User(
        name="Administrator",
        email="admin@logic.church",
        hashed_password=get_password_hash("admin123"),
        role="admin"
    )
    db.add(db_user)
    db.commit()
    print("Admin user seeded successfully!")
else:
    print("Admin user already exists.")

db.close()
