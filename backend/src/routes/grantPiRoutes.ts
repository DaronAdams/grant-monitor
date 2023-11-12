import express from 'express';
import { createGrantPiBridge, editGrantPiBridge, deleteGrantPiBridge, getGrantPiBridgeById, getGrantPiBridgeList, getGrantPiBridgeByEmployeeAndGrantId, getGrantPiBridgeListByGrantId } from '../controllers/grantPiController';

const router = express.Router();

// TODO: Define all the routes here
router.post('/create', createGrantPiBridge);
router.put('/edit/:id', editGrantPiBridge);
router.delete('/delete/:id', deleteGrantPiBridge);
router.get('/:id', getGrantPiBridgeById);
router.get('/list/pis', getGrantPiBridgeList);
router.get('/from/GrantAndEmployee', getGrantPiBridgeByEmployeeAndGrantId)
router.get('/from/Grant', getGrantPiBridgeListByGrantId)

export default router;