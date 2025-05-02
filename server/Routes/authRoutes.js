//Routes/authRoutes.js

import express from 'express';
import { loginAdmin, registerAdmin } from '../Controllers/adminUsers.js';
import { authenticateToken } from '../Middleware/auth.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

// protected routes
router.get('/dashboard', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Admin dashboard access granted', user: req.user });
});

export default router;