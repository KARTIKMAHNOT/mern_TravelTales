import express from 'express';
const router = express.Router();

import {
  signup,
  login,
  logout,
  getUserProfile,
  updateProfile,
  checkAuth,
} from '../controllers/auth.controller.js';

import { protectRoute } from '../middleware/protectRoute.js';

// Add debug logs for each route registration
console.log("Registering POST /signup");
router.post('/signup', signup);

console.log("Registering POST /login");
router.post('/login', login);

console.log("Registering POST /logout");
router.post('/logout', logout);

console.log("Registering GET /profile/:id");
router.get('/profile/:id', getUserProfile);

console.log("Registering PUT /update-profile");
router.put('/update-profile', protectRoute, updateProfile);

console.log("Registering GET /check-auth");
router.get('/check-auth', protectRoute, checkAuth);

export default router;
