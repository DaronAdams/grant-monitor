import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { Grant } from '../libs/types/grant';

const prisma = new PrismaClient();

export async function createGrant(req: Request, res: Response) {
try {
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
      endDate,
      index,
      yearlyAmount,
    } = req.body as Grant;

    // Validate that required fields are provided in the request
    if (!fund || !organization || !account || !program) {
      return res.status(400).json({ error: 'Required fields are missing in the request' });
    }

    const newGrant = await prisma.grant.create({
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
        User: {
          connect: {
            id: 6, // You may need to associate the grant with the authenticated user
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