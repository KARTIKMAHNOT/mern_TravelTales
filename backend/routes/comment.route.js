import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { getComments,addComments,deleteComments } from '../controllers/comment.controller.js';



const router = express.Router()

router.get('/getcomments/:postId',getComments);
router.post('/add-comments/:postId',protectRoute,addComments)
router.post('/delete-comments/:commentId',protectRoute,deleteComments)
export default router;