import express from 'express';
import { createEmployee } from '../controllers/employeeController';

const router = express.Router();

// TODO: Define all the routes here
router.post('/create', createEmployee);

export default router;