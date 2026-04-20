from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, Table
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql import func
import datetime
from database import Base

question_amens = Table('question_amens', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('question_id', Integer, ForeignKey('questions.id'))
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user")
    questions = relationship("Question", back_populates="author")
    comments = relationship("Comment", back_populates="author")

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    body = Column(Text, nullable=True)
    category = Column(String, default="General", index=True)
    author_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    author = relationship("User", back_populates="questions")
    comments = relationship("Comment", back_populates="question")
    amened_by = relationship("User", secondary=question_amens, backref="amened_questions")

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    body = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    question_id = Column(Integer, ForeignKey("questions.id"))
    author_id = Column(Integer, ForeignKey("users.id"))
    parent_id = Column(Integer, ForeignKey("comments.id"), nullable=True)

    question = relationship("Question", back_populates="comments")
    author = relationship("User", back_populates="comments") # Kept back_populates for consistency with User model
    replies = relationship("Comment", backref=backref("parent", remote_side=[id]))

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    date = Column(String)
    time = Column(String)
    venue = Column(String)
    recurring = Column(String, default="none")
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class GalleryImage(Base):
    __tablename__ = "gallery_images"
    
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
