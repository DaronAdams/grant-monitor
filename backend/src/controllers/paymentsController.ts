import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import PaymentAAAAHHH from '../libs/types/paymentAAAAHHH';
import { getGrantBudgetItems } from './grantBudgetItemController';
import Payment from '../libs/types/payment';

const prisma = new PrismaClient();

export async function createPayment(req: Request, res: Response) {
    try {
        const {
            type,
            earnings_code,
            hours,
            rate,
            frequency,
            date,
            grantBudgetItemId,
            employeeId,
        } = req.body as Payment;
    
        //console.log(req.body)
    
        // Validate that required fields are provided in the request
        if (!grantBudgetItemId || !employeeId) {
          return res.status(400).json({ error: 'Required fields are missing in the request' });
        }
    
        const newPayment = await prisma.payment.create({
            data: {
                type,
                earnings_code,
                hours,
                rate,
                frequency,
                date,
                grantBudgetItem: {
                    connect: {
                        id: grantBudgetItemId, // You may need to associate the grantPiBridge with the authenticated user
                    },
                },
                employee: {
                    connect: {
                        id: employeeId, // You may need to associate the grantPiBridge with the authenticated user
                    },
                },
          },
        });
    
        if (!newPayment) {
          return res.status(500).json({ error: 'An error occurred while creating the grantPiBridge' });
        }
    
        return res.status(201).json({ message: 'GrantPiBridge created successfully', payment: newPayment });
      } catch (error) {
        console.error('Error creating grantPiBridge:', error);
        return res.status(500).json({ error: 'An error occurred while creating the grantPiBridge' });
      } finally {
        await prisma.$disconnect();
      }
    }

export async function getPaymentsForGrant(req: Request, res: Response) {
try {
    // gotta get the grant ID
    const grantID = req.query.grantID;

    if (typeof grantID !== 'string') {
        return res.status(400).json({ error: 'Invalid grant ID type' });
    }

    // reassign grantID to grandId
    const grantId = parseInt(grantID, 10);
    
    console.log("Trying to get employees for: " + grantId);

    if (isNaN(grantId)) {
      return res.status(400).json({ error: 'Grant ID not a number' });
    }

    // Fetch grant employee data for the given grantID
    const grantBudgetItems = await prisma.grantBudgetItem.findMany({
        where: {
            grantId: grantId,
        },
        include: {
            payments: {
            include: {
                employee: {
                select: {
                    firstName: true,
                    lastName: true,
                    middleInitial: true,
                    uID: true,
                },
                },
            },
            },
        },
        });
    
    const paymentAHHray : PaymentAAAAHHH[] = []

    for (const budgetItem of grantBudgetItems) {
        for (const payment of budgetItem.payments){
            const paymentAH : PaymentAAAAHHH = {
                id: payment.id,
                uID: payment.employee.uID,
                firstName: payment.employee.firstName,
                middleInitial: payment.employee.middleInitial,
                lastName: payment.employee.lastName,
                type: payment.type,
                earnings_code: payment.earnings_code,
                hours: payment.hours,
                rate: payment.rate,
                frequency: payment.frequency,
                date: payment.date,
                // grantBudgetItemId: payment.grantBudgetItemId
            };
            paymentAHHray.push(paymentAH);
        }
    } 

    console.log(getGrantBudgetItems);
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

    // // Validate that required fields are provided in the request
    // if (!startDate || !grantId || !employeeId) {
    //   return res.status(400).json({ error: 'Required fields are missing in the request' });
    // }

    // const newGrantPiBridge = await prisma.grantPIBridge.create({
    //   data: {
    //     academicYearEffort,
    //     costShareEffort,
    //     summerEffort,
    //     credit,
    //     startDate,
    //     endDate,
    //     isCoPI,
    //     grant: {
    //       connect: {
    //         id: grantId, // You may need to associate the grantPiBridge with the authenticated user
    //       },
    //     },
    //     employee: {
    //         connect: {
    //           id: employeeId, // You may need to associate the grantPiBridge with the authenticated user
    //         },
    //       },
    //   },
    // });

    // if (!newGrantPiBridge) {
    //   return res.status(500).json({ error: 'An error occurred while creating the grantPiBridge' });
    // }

    return res.status(200).json({ message: 'Payment Employee data retrieved successfully', paymentEmployeeData: paymentAHHray });
} catch (error) {
  console.error('Error getting payment-employee data:', error);
  return res.status(500).json({ error: 'An error occurred while getting payment-employee data' });
} finally {
  await prisma.$disconnect();
}
}
