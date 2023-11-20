// routes/transactionRoutes.ts

import express from 'express';
import { getTransactions, createTransaction,getTransactionsByGrantBudgetItemId } from '../controllers/transactionsController';

const router = express.Router();

// GET all transactions
router.get('/list/transactions', getTransactions);
router.post('/create', createTransaction);
router.get('/:id/budgettransactions',getTransactionsByGrantBudgetItemId);

export default router;