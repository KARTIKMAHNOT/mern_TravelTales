import dotenv from'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './utils/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js'
import path from "path"
const app = express();
import cors from 'cors';
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))

const __dirname = path.resolve()
app.use(express.json({ limit: '10mb' })); // You can set '50mb' if needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments',commentRoutes)


if(process.env.NODE_ENV==="production") {
  app.use(express.static(path.join(__dirname,"/frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
  })
}
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
  connectDB();
});

