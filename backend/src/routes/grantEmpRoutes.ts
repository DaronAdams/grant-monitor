import express from 'express';
import { createGrantEmployeeBridge, editGrantEmployeeBridge, deleteGrantEmployeeBridge, getGrantEmployeeBridgeById, getGrantEmployeeBridgeList, getGrantEmployeeBridgeByEmployeeAndGrantId, getGrantEmployeeBridgeListByGrantId } from '../controllers/grantEmpController';

const router = express.Router();

// TODO: Define all the routes here
router.post('/create', createGrantEmployeeBridge);
router.put('/edit/:id', editGrantEmployeeBridge);
router.delete('/delete/:id', deleteGrantEmployeeBridge);
router.get('/:id', getGrantEmployeeBridgeById);
router.get('/list/employees', getGrantEmployeeBridgeList);
router.get('/from/GrantAndEmployee', getGrantEmployeeBridgeByEmployeeAndGrantId);
router.get('/from/Grant', getGrantEmployeeBridgeListByGrantId);

export default router;