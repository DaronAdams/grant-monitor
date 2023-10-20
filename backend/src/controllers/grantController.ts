import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createGrant(req: Request, res: Response) {
    try {
    const { fund, organization, account, userId,
         Status, startDate, endDate, grantIndex, yearlyAmount,
        costShareIndex, cayuse, sponsor, totalAmount } = req.body;


    // Create a new grant in the database using Prisma
    const newGrant = await prisma.grant.create({
      data: {
        fund,
        organization,
        account,
        userId,
        Status: 'Recieved',
        startDate,
        endDate,
        grantIndex,
        yearlyAmount,
        costShareIndex,
        cayuse,
        sponsor,
        totalAmount,
      },
    });

    if (!newGrant) {
        return res.status(500).json({ error: 'An error occurred while creating the grant' });
    }

    // Close the Prisma connection when done
    await prisma.$disconnect();

    return res.status(201).json({ message: 'Grant created successfully', grant: newGrant });
  } catch (error) {
    console.error('Error creating grant:', error);
    return res.status(500).json({ error: 'An error occurred while creating the grant' });
  }
}

export async function getGrantById(req: Request, res: Response) {
    // TODO: Implement this function
}

export async function getGrantList(req: Request, res: Response) {
    // TODO: Implement this function
}

export async function editGrant(req: Request, res: Response) {
    // TODO: Implement this function
}

export async function deleteGrant(req: Request, res: Response) {
    // TODO: Implement this function
}