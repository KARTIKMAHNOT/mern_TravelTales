# 🌍 TravelTales — A MERN Stack Social Media for Travelers

TravelTales is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that lets users share their travel stories, explore others' adventures, and engage via comments and likes.

## 🚀 Live Demo Video

🌐 [Visit TravelTales](https://mern-traveltales.onrender.com)

---

## 📸 Features

- 🔐 User Authentication (Signup, Login, Logout, JWT, Cookies)
- 👤 User Profiles (View, Update)
- 📝 Create and delete travel posts with images
- ❤️ Like/unlike posts
- 💬 Add and delete comments on posts
- 🔍 Real-time search for posts based on:
  - Caption
  - Description
  - Location (City, Country)
  - Creator name
- 🧠 Smart Post Recommendations
- 📱 Responsive UI with animations

---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Zustand (state management)
- Keen-slider (image slider)
- Framer-motion (animations)
- Lucide-react (icons)
- Tailwind CSS (styling)


### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + Cookie-based Authentication
- Cloudinary (image upload)
- CORS, dotenv, bcrypt

---

## 📁 Folder Structure
📦 TravelTales
┣ 📂 backend
┃ ┣ 📂 controllers
┃ ┣ 📂 models
┃ ┣ 📂 routes
┃ ┣ 📂 middleware
┃ ┗ server.js
┣ 📂 frontend
┃ ┣📂 Src
┃ ┣ -📂 components
┃ ┣ -📂 pages
┃ ┣ -📂 stores
┃ ┣ -📂 components
┃ ┗ -main.jsx
┣ .env
┣ package.json
┗ README.md


.env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development


run commands-> npm run dev in root folder
               npm run dev in frontend folder



