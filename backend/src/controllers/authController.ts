import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { checkValidEmail } from '../libs/utils/emailVerifyer';
import jwt, { Secret } from 'jsonwebtoken';

const prisma = new PrismaClient();
const accessTokenSecret = process.env.TOKEN_SECRET;

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

    const accessToken = jwt.sign({ email: email }, accessTokenSecret as Secret);
    return res.status(201).json({ message: 'User registered successfully', user: newUser, accessToken: accessToken });
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

    const accessToken = jwt.sign({ email: email }, accessTokenSecret as Secret);
    return res.status(200).json({ message: 'User logged in successfully', user: existingUser, accessToken: accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
