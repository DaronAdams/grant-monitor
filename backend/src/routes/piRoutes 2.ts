import express from 'express';
import { createPi } from '../controllers/piController';

const router = express.Router();

// TODO: Define all the routes here
router.post('/create', createPi);

export default router;