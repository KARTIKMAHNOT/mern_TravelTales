# 🌍 TravelTales — A MERN Stack Social Media for Travelers

**TravelTales** is a full-stack MERN (MongoDB, Express.js, React, Node.js) application where travelers can share their adventures, view others' journeys, and interact through likes and comments. It offers a clean, responsive UI with real-time search and smart post recommendations.

---

## 🎥 Live Demo Video

📺 [Watch the Demo on YouTube](https://youtu.be/wePT6HTRsfs)

---

## 📸 Features

- 🔐 **Authentication** — Secure signup, login, logout using JWT & cookies
- 👤 **User Profiles** — View and update profile information
- 📝 **Post Creation** — Add travel stories with multiple image uploads
- ❌ **Post Deletion** — Delete your own posts
- ❤️ **Like System** — Like and unlike posts
- 💬 **Comment System** — Add or remove comments
- 🔍 **Real-Time Search** — Search posts by:
  - Caption
  - Description
  - Location (City or Country)
  - Creator Name
- 📱 **Responsive Design** — Optimized for all devices with smooth animations

---

## 🛠️ Tech Stack

### 🔧 Frontend
- React + Vite
- Zustand (for state management)
- Keen-slider (image carousel)
- Framer-motion (animations)
- Lucide-react (icon set)
- Tailwind CSS (modern utility-first styling)

### ⚙️ Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + Cookie-based authentication
- Cloudinary (for storing images)
- Middleware: bcrypt, dotenv, cookie-parser, CORS

---

## 📁 Folder Structure

```
📦 TravelTales
┣ 📂 backend
┃ ┣ 📂 controllers
┃ ┣ 📂 models
┃ ┣ 📂 routes
┃ ┣ 📂 middleware
┃ ┗ server.js
┣ 📂 frontend
┃ ┗ 📂 src
┃   ┣ 📂 components
┃   ┣ 📂 pages
┃   ┣ 📂 stores
┃   ┗ main.jsx
┣ .env
┣ package.json
┗ README.md
```

---

## 🔑 .env File Format (Example)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🧪 Running the Project Locally

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/TravelTales.git
cd TravelTales
```

### 2. **Backend Setup**
```bash
cd backend
npm install
npm run dev
```

### 3. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```

Make sure you have correctly configured your `.env` file in the backend root directory.

---

## 📬 Contact

If you'd like to connect or collaborate, feel free to reach out via GitHub or LinkedIn!

---

⭐ *Star this repo if you found it useful or inspiring!*



