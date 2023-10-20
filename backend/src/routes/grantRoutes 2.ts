import express from 'express';
import { createGrant, editGrant, deleteGrant } from '../controllers/grantController';

const router = express.Router();

// TODO: Define all the routes here
router.post('/create', createGrant);

export default router;