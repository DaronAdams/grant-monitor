import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createEmployee(req: Request, res: Response) {
    try {
    const { uID, balance, firstName, lastName, rate, effort, startDate, endDate,
         } = req.body;

    const newEmployee = await prisma.employee.create({
        data: {
            uID,
            balance,
            firstName,
            lastName,
            rate,
            effort,
            startDate,
            endDate,
        },
        });

    await prisma.$disconnect();
    return res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error creating grant:', error);
        return res.status(500).json({ error: 'An error occurred while creating the employee' });
    }
}

export async function getEmployeeById(req: Request, res: Response) {
    // TODO: Implement this function
}

export async function getEmployeeList(req: Request, res: Response) {
    // TODO: Implement this function
}