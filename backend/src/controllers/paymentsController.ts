import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import PaymentAAAAHHH from '../libs/types/paymentAAAAHHH';

const prisma = new PrismaClient();

export async function getPaymentsForGrant(req: Request, res: Response) {
try {
    // gotta get the grant ID
    const grantID = req.query.grantID;

    
    // const {
    //     id,
    //     uID,
    //     firstName,
    //     middleInitial,
    //     lastName,
    //     type,
    //     earnings_code,
    //     hours,
    //     rate,
    //     frequency,
    //     date,
    // grantBudgetItemId,
    // } = req.body as PaymentAAAAHHH;

    //console.log(req.body)

    // Validate that required fields are provided in the request
    if (!startDate || !grantId || !employeeId) {
      return res.status(400).json({ error: 'Required fields are missing in the request' });
    }

    const newGrantPiBridge = await prisma.grantPIBridge.create({
      data: {
        academicYearEffort,
        costShareEffort,
        summerEffort,
        credit,
        startDate,
        endDate,
        isCoPI,
        grant: {
          connect: {
            id: grantId, // You may need to associate the grantPiBridge with the authenticated user
          },
        },
        employee: {
            connect: {
              id: employeeId, // You may need to associate the grantPiBridge with the authenticated user
            },
          },
      },
    });

    if (!newGrantPiBridge) {
      return res.status(500).json({ error: 'An error occurred while creating the grantPiBridge' });
    }

    return res.status(201).json({ message: 'GrantPiBridge created successfully', grantPiBridge: newGrantPiBridge });
  } catch (error) {
    console.error('Error creating grantPiBridge:', error);
    return res.status(500).json({ error: 'An error occurred while creating the grantPiBridge' });
  } finally {
    await prisma.$disconnect();
  }
}

