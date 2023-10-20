import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createEmployee(req: Request, res: Response) {
    // TODO: Implement this function
}

export async function getEmployeeById(req: Request, res: Response) {
    // TODO: Implement this function
}

export async function getEmployeeList(req: Request, res: Response) {
    // TODO: Implement this function
}