import express from 'express';
import { createGrant, deleteGrant, editGrant, getGrantById, getGrantList } from '../controllers/grantController';

const router = express.Router();

// TODO: Define all the routes here
router.post('/create', createGrant);
router.get('/grants', getGrantList);
router.get('/:id', getGrantById);
router.put('/update/:id', editGrant);
router.delete('/delete/:id', deleteGrant);
export default router;