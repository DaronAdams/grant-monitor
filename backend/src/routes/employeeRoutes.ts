import express from 'express';
import { createEmployee, editEmployee, deleteEmployee, getEmployeeById, getEmployeeList } from '../controllers/employeeController';

const router = express.Router();

// TODO: Define all the routes here
router.post('/create', createEmployee);
router.put('/edit/:id', editEmployee);
router.delete('/delete/:id', deleteEmployee);
router.get('/:id', getEmployeeById);
router.get('/list/employees', getEmployeeList);

export default router;