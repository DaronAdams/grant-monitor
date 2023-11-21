import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import Grant from '../libs/types/grant';
// The prisma client is responsible for communicating with the database
const prisma = new PrismaClient();

// Controller action used to create a new grant, has layered logic for creating all the required items
export async function createGrant(req: Request, res: Response) {
  try {
    const {
      // Grant fields
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
    } = req.body;

    // Validate grant fields
    if (!fund || !organization || !account || !program) {
      return res.status(400).json({ error: 'Required grant fields are missing in the request' });
    }

    // Optionally validate employee data
    // TODO: Add validation for employee data if necessary

    // Create Grant
    const newGrant = await prisma.grant.create({
      data: {
        // Grant fields
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
        User: {
          connect: {
            id: 6, // Assuming this is the user ID
          },
        },
      },
    });

    if (!newGrant) {
      return res.status(500).json({ error: 'An error occurred while creating the grant' });
    }

    return res.status(201).json({ message: 'Grant created successfully', grant: newGrant });
  } catch (error) {
    console.error('Error creating grant:', error);
    return res.status(500).json({ error: 'An error occurred while creating the grant' });
  } finally {
    await prisma.$disconnect();
  }
}



export async function getGrantById(req: Request, res: Response) {
  try {
    // Extract the grant ID from the request parameters
    const grantId = parseInt(req.params.id);

    if (isNaN(grantId)) {
      return res.status(400).json({ error: 'Invalid grant ID' });
    }

    const grant = await prisma.grant.findUnique({
      where: {
        id: grantId,
      },
    });

    if (!grant) {
      return res.status(404).json({ error: 'Grant not found' });
    }

    return res.status(200).json({ message: 'Grant found', grant });
  } catch (error) {
    console.error('Error getting grant by ID:', error);
    return res.status(500).json({ error: 'An error occurred while getting the grant by ID' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getGrantList(req: Request, res: Response) {
  try {
    const grants = await prisma.grant.findMany({
      where: {
        userId: 6,
      },
    });

    if (!grants || grants.length === 0) {
      return res.status(404).json({ error: 'No grants found' });
    }

    return res.status(200).json({ message: 'Grants found', grants });
  } catch (error) {
    console.error('Error getting grants:', error);
    return res.status(500).json({ error: 'An error occurred while getting the grants' });
  } finally {
    await prisma.$disconnect();
  }
}


export async function editGrant(req: Request, res: Response) {
    try {
    // Extract the grant ID from the request parameters
    const grantId = parseInt(req.params.id);

    if (isNaN(grantId)) {
      return res.status(400).json({ error: 'Invalid grant ID', grantId });
    }

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
      index,
      endDate,
      yearlyAmount,
    } = req.body as Grant;


    // Use Prisma to update the grant by ID
    const updatedGrant = await prisma.grant.update({
      where: {
        index: grantId,
      },
      data: {
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
      }
    });

    if (!updatedGrant) {
      return res.status(404).json({ error: 'Grant not found' });
    }

    return res.status(200).json({ message: 'Grant updated successfully', grant: updatedGrant });
  } catch (error) {
    console.error('Error editing grant:', error);
    return res.status(500).json({ error: 'An error occurred while editing the grant' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteGrant(req: Request, res: Response) {
  try {
    // Extract the grant ID from the request parameters
    const grantId = parseInt(req.params.id);

    if (isNaN(grantId)) {
      return res.status(400).json({ error: 'Invalid grant ID' });
    }

    // Use Prisma to delete the grant by ID
    const deletedGrant = await prisma.grant.delete({
      where: {
        id: grantId,
      },
    });

    if (!deletedGrant) {
      return res.status(404).json({ error: 'Grant not found' });
    }

    return res.status(200).json({ message: 'Grant deleted successfully' });
  } catch (error) {
    console.error('Error deleting grant:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the grant' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getGrantExpensesForEachMonth(req: Request, res: Response) {
  try {
    // Extract data from the request
    const grantId = parseInt(req.body.grantID);
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (isNaN(grantId) || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Fetch grant budget items for the given grantID
    const grantBudgetItems = await prisma.grantBudgetItem.findMany({
      where: {
        grantId: grantId,
      },
      include: {
        transactions: true,
      },
    });

    // Create an array for each month and initialize values to 0
    const monthsArray = Array.from({ length: 12 }, () => 0);

    // Loop over grant budget items
    for (const budgetItem of grantBudgetItems) {
      // Loop over transactions for each budget item
      for (const transaction of budgetItem.transactions) {
        const transactionDate = new Date(transaction.date);

        // Check if the transaction date is within the specified range
        if (transactionDate >= startDate && transactionDate <= endDate) {
          // Increment the corresponding month's value in the array
          const monthIndex = transactionDate.getMonth();
          monthsArray[monthIndex] += transaction.amount;
        }
      }
    }

    return res.status(200).json({ message: 'Expense data retrieved successfully', expenses: monthsArray });
  } catch (error) {
    console.error('Error getting grant expenses:', error);
    return res.status(500).json({ error: 'An error occurred while getting grant expenses' });
  } finally {
    await prisma.$disconnect();
  }
}

/*getGrantExpensesForEachMonth (Request,response) 

request would have the following data: grantID, startDate, endDate
fill out function like so

1. create an array corresponding to each month (array[0] could be Januray, array[1] could be February)
2. loop over all grant budget items that have the grantID from the request
  2a. in an inner loop, loop over all transaction objects that have the grant budget item id from the outer loop
  2b. if the transaction's date is between the start date and end date in the request, then add its value to the appropriate value of the array
3. after the double loop has ran, return the array









*/