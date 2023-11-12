import express from 'express';
import { createGrantPiBridge, editGrantPiBridge, deleteGrantPiBridge, getGrantPiBridgeById, getGrantPiBridgeList } from '../controllers/grantPiController';

const router = express.Router();

// TODO: Define all the routes here
router.post('/create', createGrantPiBridge);
router.put('/edit/:id', editGrantPiBridge);
router.delete('/delete/:id', deleteGrantPiBridge);
router.get('/:id', getGrantPiBridgeById);
router.get('/list/pis', getGrantPiBridgeList);

export default router;