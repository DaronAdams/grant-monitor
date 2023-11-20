import express from 'express';
import { getGrantBudgetItems, createGrantBudgetItem, getGrantBudgetItemsByGrantId } from '../controllers/grantBudgetItemController';

const router = express.Router();

// GET all transactions
router.post('/create', createGrantBudgetItem);
router.get('/list/grantBudgetItems', getGrantBudgetItems);
router.get('/by-grant/:id', getGrantBudgetItemsByGrantId);

export default router;