import express from 'express';
import { 
    changePassword,
    loginUser,
    registerUser 
} from '../controllers/authController';

const router = express.Router();
// Define all the routes here
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/change-password', changePassword);

export default router;