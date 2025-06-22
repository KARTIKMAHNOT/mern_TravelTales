import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import {
  createPost,
  deletePost,
  getMyPost,
  getAllPosts,
  getRecommendedPosts,
  getPost,
  toggleLike,
} from '../controllers/post.controller.js';

import Post from '../models/post.model.js';

const router = express.Router();

// Add debug logs for each route registration
console.log("Registering POST /create-post");
router.post('/create-post', protectRoute, createPost);

console.log("Registering DELETE /delete-post/:id");
router.delete('/delete-post/:id', protectRoute, deletePost);

console.log("Registering GET /myposts");
router.get('/myposts', protectRoute, getMyPost);

console.log("Registering GET /allposts");
router.get('/allposts', getAllPosts);

console.log("Registering GET /getrecommended");
router.get('/getrecommended', getRecommendedPosts);

console.log("Registering GET /getpost/:id");
router.get('/getpost/:id', getPost);

console.log("Registering PUT /togglelike/:id");
router.put('/togglelike/:id', protectRoute, toggleLike);

console.log("Registering GET /search-posts");
router.get("/search-posts", async (req, res) => {
  try {
    const { query, page = 1, limit = 8 } = req.query;

    if (!query || query.trim() === "") {
      const skip = (page - 1) * limit;
      const total = await Post.countDocuments({});
      const posts = await Post.find({})
        .populate("creator", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

      return res.json({
        posts,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
      });
    }

    const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, "i");

    const filters = {
      $or: [
        { caption: regex },
        { description: regex },
        { "location.city": { $exists: true, $regex: regex } },
        { "location.country": { $exists: true, $regex: regex } },
      ],
    };

    const skip = (page - 1) * limit;
    const total = await Post.countDocuments(filters);
    const posts = await Post.find(filters)
      .populate("creator", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      posts,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({
      message: "Failed to search posts",
      error: err.message,
    });
  }
});

export default router;
