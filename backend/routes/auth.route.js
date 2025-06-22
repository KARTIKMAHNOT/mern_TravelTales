import express from 'express';
const router = express.Router();
import { signup, login, logout,getUserProfile,updateProfile,checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.get('/profile/:id',getUserProfile);
router.put('/update-profile',protectRoute,updateProfile);
router.get('/check-auth', protectRoute, checkAuth);

export default router;