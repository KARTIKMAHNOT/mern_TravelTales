import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getComments, addComments, deleteComments } from '../controllers/comment.controller.js';

const router = express.Router();

// Debug logs for route registration
console.log("Registering GET /getcomments/:postId");
router.get('/getcomments/:postId', getComments);

console.log("Registering POST /add-comments/:postId");
router.post('/add-comments/:postId', protectRoute, addComments);

console.log("Registering POST /delete-comments/:commentId");
router.post('/delete-comments/:commentId', protectRoute, deleteComments);

export default router;
