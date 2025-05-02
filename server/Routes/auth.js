import express from 'express';
import { loginAdmin, registerAdmin } from '../Controllers/adminUsers.js';
import { logout, verifyToken } from '../Controllers/auth.js';
import { authenticateToken } from '../Middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

// Protected routes
router.post('/logout', authenticateToken, logout);
router.get('/verify', authenticateToken, verifyToken);

export default router; 