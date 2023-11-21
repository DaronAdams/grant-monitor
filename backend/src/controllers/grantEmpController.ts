import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import GrantEmployeeBridge from '../libs/types/grantEmployeeBridge';

const prisma = new PrismaClient();

export async function createGrantEmployeeBridge(req: Request, res: Response) {
try {
    const {
        rate,
        effort,
        startDate,
        endDate,
        grantId,
        employeeId,
    } = req.body as GrantEmployeeBridge;

    // Validate that required fields are provided in the request
    if (!rate || !effort  || !startDate || !grantId || !employeeId) {
      return res.status(400).json({ error: 'Required fields are missing in the request' });
    }

    const newGrantEmployeeBridge = await prisma.grantEmployeeBridge.create({
      data: {
        rate,
        effort,
        startDate,
        endDate,
        grant: {
          connect: {
            id: grantId, // You may need to associate the grantEmployeeBridge with the authenticated user
          },
        },
        employee: {
            connect: {
              id: employeeId, // You may need to associate the grantEmployeeBridge with the authenticated user
            },
          },
      },
    });

    if (!newGrantEmployeeBridge) {
      return res.status(500).json({ error: 'An error occurred while creating the grantEmployeeBridge' });
    }

    return res.status(201).json({ message: 'GrantEmployeeBridge created successfully', grantEmployeeBridge: newGrantEmployeeBridge });
  } catch (error) {
    console.error('Error creating grantEmployeeBridge:', error);
    return res.status(500).json({ error: 'An error occurred while creating the grantEmployeeBridge' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getGrantEmployeeBridgeById(req: Request, res: Response) {
  try {
    // Extract the grantEmployeeBridge ID from the request parameters
    const grantEmployeeBridgeId = parseInt(req.params.id);

    if (isNaN(grantEmployeeBridgeId)) {
      return res.status(400).json({ error: 'Invalid grantEmployeeBridge ID' });
    }

    const grantEmployeeBridge = await prisma.grantEmployeeBridge.findUnique({
      where: {
        id: grantEmployeeBridgeId,
      },
    });

    if (!grantEmployeeBridge) {
      return res.status(404).json({ error: 'GrantEmployeeBridge not found' });
    }

    return res.status(200).json({ message: 'GrantEmployeeBridge found', grantEmployeeBridge });
  } catch (error) {
    console.error('Error getting grantEmployeeBridge by ID:', error);
    return res.status(500).json({ error: 'An error occurred while getting the grantEmployeeBridge by ID' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getGrantEmployeeBridgeByEmployeeAndGrantId(req: Request, res: Response) {
    try {
      const { employeeId, grantId } = req.body;

      console.log(req.body)
  
      // Validate that required fields are provided in the request body
      if (isNaN(employeeId) || isNaN(grantId)) {
        return res.status(400).json({ error: 'Invalid employee ID or grant ID' });
      }
  
      const grantEmployeeBridge = await prisma.grantEmployeeBridge.findFirst({
        where: {
          employeeId: employeeId,
          grantId: grantId,
        },
      });
  
      if (!grantEmployeeBridge) {
        return res.status(404).json({ error: 'GrantEmployeeBridge not found' });
      }
  
      return res.status(200).json({ message: 'GrantEmployeeBridge found', grantEmployeeBridge });
    } catch (error) {
      console.error('Error getting grantEmployeeBridge by Employee and Grant ID:', error);
      return res.status(500).json({ error: 'An error occurred while getting the grantEmployeeBridge by Employee and Grant ID' });
    } finally {
      await prisma.$disconnect();
    }
}

export async function getGrantEmployeeBridgeListByGrantId(req: Request, res: Response) {
    try {
      const { grantId } = req.body;

      console.log(req.body)
  
      // Validate that required fields are provided in the request body
      if (isNaN(grantId)) {
        return res.status(400).json({ error: 'Invalid grant ID' });
      }
  
      const grantEmployeeBridge = await prisma.grantEmployeeBridge.findMany({
        where: {
          grantId: grantId,
        },
      });
  
      if (!grantEmployeeBridge) {
        return res.status(404).json({ error: 'GrantEmployeeBridge not found' });
      }
  
      return res.status(200).json({ message: 'GrantEmployeeBridge found', grantEmployeeBridge });
    } catch (error) {
      console.error('Error getting grantEmployeeBridge by Grant ID:', error);
      return res.status(500).json({ error: 'An error occurred while getting the grantEmployeeBridge by Grant ID' });
    } finally {
      await prisma.$disconnect();
    }
}

export async function getGrantEmployeeBridgeList(req: Request, res: Response) {
  try {
    const grantEmployeeBridges = await prisma.grantEmployeeBridge.findMany({});

    if (!grantEmployeeBridges || grantEmployeeBridges.length === 0) {
      return res.status(404).json({ error: 'No grantEmployeeBridges found' });
    }

    return res.status(200).json({ message: 'GrantEmployeeBridges found', grantEmployeeBridges });
  } catch (error) {
    console.error('Error getting grantEmployeeBridges:', error);
    return res.status(500).json({ error: 'An error occurred while getting the grantEmployeeBridges' });
  } finally {
    await prisma.$disconnect();
  }
}


export async function editGrantEmployeeBridge(req: Request, res: Response) {
    try {
    // Extract the grantEmployeeBridge ID from the request parameters
    const grantEmployeeBridgeId = parseInt(req.params.id);

    if (isNaN(grantEmployeeBridgeId)) {
      return res.status(400).json({ error: 'Invalid grantEmployeeBridge ID', grantEmployeeBridgeId });
    }

    const {
        rate,
        effort,
        startDate,
        endDate,
        grantId,
        employeeId,
    } = req.body as GrantEmployeeBridge;


    // Use Prisma to update the grantEmployeeBridge by ID
    const updatedGrantEmployeeBridge = await prisma.grantEmployeeBridge.update({
      where: {
        id: grantEmployeeBridgeId,
      },
      data: {
        rate,
        effort,
        startDate,
        endDate,
        grant: {
            connect: {
              id: grantId, // You may need to associate the grantEmployeeBridge with the authenticated user
            },
          },
        employee: {
            connect: {
            id: employeeId, // You may need to associate the grantEmployeeBridge with the authenticated user
            },
        },
      }
    });

    if (!updatedGrantEmployeeBridge) {
      return res.status(404).json({ error: 'GrantEmployeeBridge not found' });
    }

    return res.status(200).json({ message: 'GrantEmployeeBridge updated successfully', grantEmployeeBridge: updatedGrantEmployeeBridge });
  } catch (error) {
    console.error('Error editing grantEmployeeBridge:', error);
    return res.status(500).json({ error: 'An error occurred while editing the grantEmployeeBridge' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteGrantEmployeeBridge(req: Request, res: Response) {
  try {
    // Extract the grantEmployeeBridge ID from the request parameters
    const grantEmployeeBridgeId = parseInt(req.params.id);

    if (isNaN(grantEmployeeBridgeId)) {
      return res.status(400).json({ error: 'Invalid grantEmployeeBridge ID' });
    }

    // Use Prisma to delete the grantEmployeeBridge by ID
    const deletedGrantEmployeeBridge = await prisma.grantEmployeeBridge.delete({
      where: {
        id: grantEmployeeBridgeId,
      },
    });

    if (!deletedGrantEmployeeBridge) {
      return res.status(404).json({ error: 'GrantEmployeeBridge not found' });
    }

    return res.status(200).json({ message: 'GrantEmployeeBridge deleted successfully' });
  } catch (error) {
    console.error('Error deleting grantEmployeeBridge:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the grantEmployeeBridge' });
  } finally {
    await prisma.$disconnect();
  }
}