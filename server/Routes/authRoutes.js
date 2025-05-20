import express from 'express';
import { loginAdmin, registerAdmin, inviteAdmin, magicLogin, setPassword } from '../Controllers/adminUsers.js';
import { logout, verifyToken } from '../Controllers/auth.js';
import { authenticateToken } from '../Middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.post('/invite-admin', inviteAdmin);
router.post('/magic-login', magicLogin);
router.post('/set-password', setPassword);

// Protected routes
router.post('/logout', authenticateToken, logout);
router.get('/verify', authenticateToken, verifyToken);

// // protected routes
// router.get('/dashboard', authenticateToken, (req, res) => {
//   res.status(200).json({ message: 'Admin dashboard access granted', user: req.user });
// });

export default router; 
