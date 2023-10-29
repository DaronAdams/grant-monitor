import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { checkValidEmail } from '../libs/utils/emailVerifyer';

const prisma = new PrismaClient();

export async function registerUser(req: Request, res: Response) {
  const { email, password } = req.body;
  
  try {
    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Create a new user
    const newUser = await prisma.user.create({
      data: { email, password },
    });

    if (checkValidEmail(email) === false) {
      return res.status(400).json({ message: 'Email is not valid' });
    }

    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  } 
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return res.status(400).json({ message: 'Email is not registered' });
    }

    if (password !== existingUser.password) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }

    return res.status(200).json({ message: 'User logged in successfully', user: existingUser, id: existingUser.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}




