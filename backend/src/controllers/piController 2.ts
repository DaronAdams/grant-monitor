import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPi(req: Request, res: Response) {
    try {
    const { uNumber, firstName, lastName, summerEffort, months, costShareEffort,
    academicYearEffort, credit, grantId } = req.body;

    const grant = await prisma.grant.findUnique({
      where: { id: grantId },
    });

    if (!grant) {
      return res.status(404).json({ error: 'Grant not found' });
    }

    const newPi = await prisma.pI.create({
        data: {
            uNumber,
            firstName,
            lastName,
            summerEffort,
            months,
            costShareEffort,
            academicYearEffort,
            credit,
            Grant: { connect: { id: grantId } },
        },
        });
        await prisma.$disconnect();
        return res.status(201).json({ message: 'PI created successfully', pi: newPi });
    } catch (error) {
        console.error('Error creating PI:', error);
        return res.status(500).json({ error: 'An error occurred while creating the PI' });
    }
}

export async function getPiById(req: Request, res: Response) {
    // TODO: Implement this function
}

export async function getPiList(req: Request, res: Response) {
    // TODO: Implement this function
}
