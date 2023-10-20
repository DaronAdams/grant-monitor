import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createGrant(req: Request, res: Response) {
    try {
    // TODO: Get the grant data from the request body

    // Close the Prisma connection when done
    await prisma.$disconnect();

    return res.status(201).json({ message: 'Grant created successfully', grant: newGrant });
  } catch (error) {
    console.error('Error creating grant:', error);
    return res.status(500).json({ error: 'An error occurred while creating the grant' });
  }

}

export async function editGrant(req: Request, res: Response) {
    // TODO: Implement this function
}

export async function deleteGrant(req: Request, res: Response) {
    // TODO: Implement this function
}