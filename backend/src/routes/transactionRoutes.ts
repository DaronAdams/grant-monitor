// routes/transactionRoutes.ts

import express from 'express';
import { getTransactions, createTransaction } from '../controllers/transactionsController';

const router = express.Router();

// GET all transactions
router.get('/list/transactions', getTransactions);
router.post('/create', createTransaction);

export default router;