import express from 'express';
import { loginUser, registerUser, verifyToken } from '../controllers/authController';

const router = express.Router();
// Define all the routes here
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyToken);

export default router;