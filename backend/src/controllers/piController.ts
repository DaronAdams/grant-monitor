import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPi(req: Request, res: Response) {
    // TODO: Implement this function
}

export async function getPiById(req: Request, res: Response) {
    // TODO: Implement this function
}

export async function getPiList(req: Request, res: Response) {
    // TODO: Implement this function
}

