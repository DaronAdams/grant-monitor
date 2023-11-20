import { PrismaClient} from '@prisma/client';
import { Request, Response } from 'express';
import GrantBudgetItem from '../libs/types/grantBudgetItem';

const prisma = new PrismaClient();


// get grant budget items belonging to a grant

async function getGrantBudgetItemsByGrantId(req: Request, res: Response) {
  try {
    const grantId = parseInt(req.params.id, 10); // Assuming the grantId is in the route parameters

    const grantBudgetItems = await prisma.grantBudgetItem.findMany({
      where: {
        grant: {
          id: grantId,
        },
      },
    });

    return res.json(grantBudgetItems);
  } catch (error) {
    console.error('Error fetching grant budget items:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getGrantBudgetItems(req: Request, res: Response) {
    try {
      const grantBudgetItems = await prisma.grantBudgetItem.findMany();
      return res.json(grantBudgetItems);
    } catch (error) {
      console.error('Error fetching grantBudgetItems:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  
async function createGrantBudgetItem(req: Request, res: Response) {
    const { 
        name,
        balance,
        commitment,
        spent,
        account,
        category,
        grantId } = req.body as GrantBudgetItem;
  
    try {
      const newGrantBudgetItem = await prisma.grantBudgetItem.create({
        data: {
            name,
            balance,
            commitment,
            spent,
            account,
            category,
            grant: {
            connect: {
              id: grantId, // You may need to associate the grantPiBridge with the authenticated user
            },
          },
        },
      });
  
      return res.json(newGrantBudgetItem);
    } catch (error) {
      console.error('Error creating grant budget item:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

export { getGrantBudgetItems, createGrantBudgetItem , getGrantBudgetItemsByGrantId};