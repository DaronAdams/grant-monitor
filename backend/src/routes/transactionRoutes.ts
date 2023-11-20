// routes/transactionRoutes.ts

import express from 'express';
import { getTransactions, createTransaction,getTransactionsByGrantBudgetItemId } from '../controllers/transactionsController';

const router = express.Router();

// GET all transactions
router.get('/list/transactions', getTransactions);
router.post('/create', createTransaction);
router.get('/by-grant-budget-item/:id', getTransactionsByGrantBudgetItemId);

export default router;