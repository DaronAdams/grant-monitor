import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import GrantPiBridge from '../libs/types/grantPiBridge';

const prisma = new PrismaClient();

export async function createGrantPiBridge(req: Request, res: Response) {
try {
    const {
        academicYearEffort,
        costShareEffort,
        summerEffort,
        credit,
        startDate,
        endDate,
        isCoPI,
        grantId,
        employeeId,
    } = req.body as GrantPiBridge;

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


export async function getGrantPiBridgeById(req: Request, res: Response) {
  try {
    // Extract the grantPiBridge ID from the request parameters
    const grantPiBridgeId = parseInt(req.params.id);

    if (isNaN(grantPiBridgeId)) {
      return res.status(400).json({ error: 'Invalid grantPiBridge ID' });
    }

    const grantPiBridge = await prisma.grantPIBridge.findUnique({
      where: {
        id: grantPiBridgeId,
      },
    });

    if (!grantPiBridge) {
      return res.status(404).json({ error: 'GrantPiBridge not found' });
    }

    return res.status(200).json({ message: 'GrantPiBridge found', grantPiBridge });
  } catch (error) {
    console.error('Error getting grantPiBridge by ID:', error);
    return res.status(500).json({ error: 'An error occurred while getting the grantPiBridge by ID' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getGrantPiBridgeList(req: Request, res: Response) {
  try {
    const grantPiBridges = await prisma.grantPIBridge.findMany({
      
    });

    if (!grantPiBridges || grantPiBridges.length === 0) {
      return res.status(404).json({ error: 'No grantPiBridges found' });
    }

    return res.status(200).json({ message: 'GrantPiBridges found', grantPiBridges });
  } catch (error) {
    console.error('Error getting grantPiBridges:', error);
    return res.status(500).json({ error: 'An error occurred while getting the grantPiBridges' });
  } finally {
    await prisma.$disconnect();
  }
}


export async function editGrantPiBridge(req: Request, res: Response) {
    try {
    // Extract the grantPiBridge ID from the request parameters
    const grantPiBridgeId = parseInt(req.params.id);

    if (isNaN(grantPiBridgeId)) {
      return res.status(400).json({ error: 'Invalid grantPiBridge ID', grantPiBridgeId });
    }

    const {
        academicYearEffort,
        costShareEffort,
        summerEffort,
        credit,
        startDate,
        endDate,
        isCoPI,
        grantId,
        employeeId,
    } = req.body as GrantPiBridge;


    // Use Prisma to update the grantPiBridge by ID
    const updatedGrantPiBridge = await prisma.grantPIBridge.update({
      where: {
        id: grantPiBridgeId,
      },
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
      }
    });

    if (!updatedGrantPiBridge) {
      return res.status(404).json({ error: 'GrantPiBridge not found' });
    }

    return res.status(200).json({ message: 'GrantPiBridge updated successfully', grantPiBridge: updatedGrantPiBridge });
  } catch (error) {
    console.error('Error editing grantPiBridge:', error);
    return res.status(500).json({ error: 'An error occurred while editing the grantPiBridge' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteGrantPiBridge(req: Request, res: Response) {
  try {
    // Extract the grantPiBridge ID from the request parameters
    const grantPiBridgeId = parseInt(req.params.id);

    if (isNaN(grantPiBridgeId)) {
      return res.status(400).json({ error: 'Invalid grantPiBridge ID' });
    }

    // Use Prisma to delete the grantPiBridge by ID
    const deletedGrantPiBridge = await prisma.grantPIBridge.delete({
      where: {
        id: grantPiBridgeId,
      },
    });

    if (!deletedGrantPiBridge) {
      return res.status(404).json({ error: 'GrantPiBridge not found' });
    }

    return res.status(200).json({ message: 'GrantPiBridge deleted successfully' });
  } catch (error) {
    console.error('Error deleting grantPiBridge:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the grantPiBridge' });
  } finally {
    await prisma.$disconnect();
  }
}