from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "user"

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    admin: Optional[UserResponse] = None

class QuestionCreate(BaseModel):
    title: str
    body: Optional[str] = ""

class CommentCreate(BaseModel):
    body: str
    parent_id: Optional[int] = None

class EventBase(BaseModel):
    title: str
    date: str
    time: str
    venue: str
    recurring: str = "none"
    image_url: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int
    
    class Config:
        from_attributes = True

class GalleryImageBase(BaseModel):
    image_url: str

class GalleryImageCreate(GalleryImageBase):
    pass

class GalleryImageResponse(GalleryImageBase):
    id: int

    class Config:
        from_attributes = True
