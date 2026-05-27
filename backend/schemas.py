from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class AdminUserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str

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
    category: Optional[str] = "General"

class QuestionUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    category: Optional[str] = None


class CommentCreate(BaseModel):
    body: str
    parent_id: Optional[int] = None

class CommentUpdate(BaseModel):
    body: str


class EventBase(BaseModel):
    title: str
    date: str
    time: str
    venue: str
    recurring: str = "none"
    image_url: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    venue: Optional[str] = None
    recurring: Optional[str] = None
    image_url: Optional[str] = None

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
    order: int
    
    class Config:
        from_attributes = True

class GalleryReorder(BaseModel):
    image_ids: list[int]

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class TalkToPPCMessageCreate(BaseModel):
    name: str
    phone: str
    gender: str
    request_type: str
    message: str

class SiteSettingUpdate(BaseModel):
    value: str

class SiteSettingResponse(BaseModel):
    key: str
    value: str

    class Config:
        from_attributes = True

class NewsletterSubscribeCreate(BaseModel):
    email: str
