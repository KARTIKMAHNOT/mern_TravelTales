import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { createPost, deletePost, getMyPost,getAllPosts,getRecommendedPosts,getPost,toggleLike} from '../controllers/post.controller.js';
const router = express.Router();
import Post from '../models/post.model.js';
router.post('/create-post', protectRoute, createPost);
router.delete('/delete-post/:id',protectRoute,deletePost);
router.get('/myposts',protectRoute,getMyPost)
router.get('/allposts',getAllPosts)
router.get('/getrecommended',getRecommendedPosts);
router.get('/getpost/:id',getPost);
router.put('/togglelike/:id',protectRoute,toggleLike)
router.get("/search-posts", async (req, res) => {
    try {
      const { query, page = 1, limit = 8 } = req.query;
  
      // Handle empty query by returning all posts
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
  
      // Escape special regex characters in the query
      const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedQuery, "i");
  
      const filters = {
        $or: [
          { caption: regex },
          { description: regex },
          { location: regex },
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
        error: err.message 
      });
    }
  });
  
export default router;


