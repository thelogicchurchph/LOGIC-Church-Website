# LOGIC Church Port Harcourt - Web Platform

A premium, modern web application for THE LOGIC CHURCH Port Harcourt, featuring a community forum, event management, and a robust administrative dashboard.

## 🚀 Tech Stack

- **Frontend:** React 19 (Vite), Tailwind CSS 4, Material UI Icons
- **Backend:** FastAPI (Python), SQLite, SQLAlchemy
- **Authentication:** JWT (JSON Web Tokens) with Password Hashing
- **Animations:** Animate.css & Framer Motion (for micro-interactions)
- **Data Fetching:** Axios with Interceptors for Auth persistence

## ✨ Key Features

### 🏛️ Admin Dashboard (Command Center)
- **Glassmorphic UI:** A premium administrative experience with real-time analytics.
- **Event Management:** Create, update, and persist church events with high-quality photo uploads.
- **Live Gallery:** Manage the home page gallery assets via a persistent server-side storage system.
- **User Moderation:** View and manage administrative accounts and church community members.
- **Forum Moderation:** Delete and moderate community discussions directly.

### 💬 Community Forum
- **Nested Threading:** Deep discussion support with visual connectors and recursive replies.
- **Real-time Interaction:** Seamlessly ask questions and participate in church dialogues.
- **Profile Customization:** Interactive user profiles with initials-based avatars.

### 📅 Event & Gallery Systems
- **Persistent Media:** Photos are saved permanently on the server with a structured `uploads/` system.
- **Bulk Uploading:** Admins can select and upload multiple gallery images simultaneously.
- **Interactive public views:** Beautifully animated cards and swipers for events and gallery highlights.

## 🛠️ Setup & Installation

### Backend Setup
1. Navigate to `backend/`
2. Create virtual environment: `python -m venv venv`
3. Activate: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt` (or install fastapi, uvicorn, sqlalchemy, etc.)
5. Run server: `uvicorn main:app --reload`

### Frontend Setup
1. Navigate to root directory
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

---

## 🎨 Design Philosophy
The platform follows a high-end **Glassmorphism** design aesthetic with:
- Deep dark backgrounds with vibrant red accents (#CE1F2F).
- Translucent layouts with backdrop blurs.
- Smooth CSS micro-animations for an "alive" feel.

---

© 2026 THE LOGIC CHURCH - Port Harcourt