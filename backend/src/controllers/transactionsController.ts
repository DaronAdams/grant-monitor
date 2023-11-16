import { PrismaClient} from '@prisma/client';
import { Request, Response } from 'express';
import Transaction from '../libs/types/transaction';

const prisma = new PrismaClient();

// get transactions belonging to a grant budget item

async function getTransactionsByGrantBudgetItemId(grantBudgetItemId: number): Promise<Transaction[]> {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        id: grantBudgetItemId,
      },
    });
    return transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Internal Server Error');
  }
}

async function getTransactions(req: Request, res: Response) {
  try {
    const transactions = await prisma.transaction.findMany();
    return res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createTransaction(req: Request, res: Response) {
    const { amount, date, grantBudgetItemId } = req.body as Transaction;
  
    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          amount,
          date,
          grantBudgetItem: {
            connect: {
              id: grantBudgetItemId, // You may need to associate the grantPiBridge with the authenticated user
            },
          },
        },
      });
  
      return res.json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

export { getTransactions, createTransaction ,getTransactionsByGrantBudgetItemId};