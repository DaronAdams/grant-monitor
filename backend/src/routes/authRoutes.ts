import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';

const router = express.Router();
// Define all the routes here
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;