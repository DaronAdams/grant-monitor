import express from 'express';
import { getGrantBudgetItems, createGrantBudgetItem, } from '../controllers/grantBudgetItemController';

const router = express.Router();

// GET all transactions
router.post('/create', createGrantBudgetItem);
router.get('/list/grantBudgetItems', getGrantBudgetItems);

export default router;