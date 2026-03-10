# 📝 Note Flow

**Note Flow** is a collaborative note-taking web application built using the **MERN Stack (MongoDB, Express, React, Node.js)** with **Tailwind CSS** for styling.  
The application allows users to create, manage, and collaborate on notes with role-based permissions. It also supports searching, filtering, and pinning notes for better organization.

---

## ✨ Features

### 🔐 User Authentication
- Users can **register and login securely** using **JWT authentication**.

### 📝 Note Management
- Create new notes
- View list of notes
- Update existing notes
- Delete notes (owner only)

### 🤝 Collaborative Notes
- Users can **add collaborators** to a note.
- Role-based access control:
  - 👁️ **View Only** – Can view the note but cannot edit or delete it.
  - ✏️ **Edit** – Can edit the note but cannot delete it.
- Only the **note owner** can remove collaborators.

### 📌 Pin Notes
- Users can **pin important notes** for quick access.

### 🔍 Filters & Search
- Filter notes by:
  - All Notes
  - My Notes
  - Shared Notes
  - Pinned Notes
- **Full-text search** to quickly find notes.

### 🖊️ Rich Text Editor
- Users can format notes using a **rich text editor**.

### 📧 Email Notifications
- When a user is added as a collaborator, the system sends an **email notification** to inform them.

---

## 🛠️ Tech Stack

### 🎨 Frontend
- ⚛️ React
- 🎨 Tailwind CSS
- 🔗 Axios
- 🔔 React Toastify

### ⚙️ Backend
- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB
- 📦 Mongoose
- 🔐 JSON Web Token (JWT)
- 📧 Nodemailer

---

## 🧪 Testing

### ✅ Manual Testing
The application was tested manually to ensure all functionalities work correctly from the **end-user perspective**.

### 📬 API Testing (Postman)
All backend API endpoints were tested using **Postman** to validate request handling, authentication, and correct responses.

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas
  
### 1️⃣ Clone Repository

https://github.com/Nirosh-Edirisinghe/NoteFlow.git

cd note-flow

# Install backend dependencies
cd Backend
npm install

### 🔧 Setup Environment Variables

**Example `.env` for the backend:**
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

```
# Run backend
cd Backend
npm run server

# Install frontend dependencies
cd Frontend
npm install

**Example `.env` for the frontend:**
```env
VITE_BACKEND_URL='http://localhost:4000'

```
# Run frontend
cd Frontend
npm run dev

```
⭐ If you like this project, don’t forget to star the repo and share it! ⭐

```
