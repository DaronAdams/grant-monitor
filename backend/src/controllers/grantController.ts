import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { Grant } from '../libs/types/grant';

const prisma = new PrismaClient();

export async function createGrant(req: Request, res: Response) {
  try {
    // Extract the relevant fields from req.body using the YourModel type
    const {
      fund,
      organization,
      account,
      program,
      costShareIndex,
      cayuse,
      sponsor,
      status,
      totalAmount,
      startDate,
      endDate,
      index,
      yearlyAmount,
      User
    } = req.body as Grant;

    // const newGrant = await prisma.grant.create({
    //   data: {
    //     fund,
    //     organization,
    //     account,
    //     program,
    //     costShareIndex,
    //     cayuse,
    //     sponsor,
    //     status,
    //     totalAmount,
    //     startDate,
    //     endDate,
    //     index,
    //     yearlyAmount,
    //     User: {
    //       connect: {
    //         id: User.id
    //       }
    //     }
    //   },
    // });

    // if (!newGrant) {
    //   return res.status(500).json({ error: 'An error occurred while creating the grant' });
    // }

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