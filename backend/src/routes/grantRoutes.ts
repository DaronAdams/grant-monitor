import express from 'express';
import { createGrant, editGrant, deleteGrant, getGrantById, getGrantList } from '../controllers/grantController';

const router = express.Router();

// TODO: Define all the routes here
router.post('/create', createGrant);
router.put('/edit/:id', editGrant);
router.delete('/delete/:id', deleteGrant);
router.get('/:id', getGrantById);
router.get('/list/grants', getGrantList);

export default router;