// routes/transactionRoutes.ts

import express from 'express';
import { getTransactions, createTransaction } from '../controllers/transactionsController';

const router = express.Router();

// GET all transactions
router.get('/transactions', getTransactions);
router.get('/create/transactions', createTransaction);

export default router;