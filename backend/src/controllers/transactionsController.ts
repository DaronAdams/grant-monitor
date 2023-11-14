import { PrismaClient} from '@prisma/client';
import { Request, Response } from 'express';
import Transactions from '../libs/types/transactions';
import CreateTransactionInput from '../libs/types/transactions';

const prisma = new PrismaClient();

async function getTransactions(req: Request, res: Response) {
  try {
    const transactions = await prisma.transaction.findMany();
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createTransaction(req: Request, res: Response) {
    const { amount, date } = req.body as CreateTransactionInput;
  
    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          amount,
          date,
        },
      });
  
      res.json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

export { getTransactions, createTransaction };