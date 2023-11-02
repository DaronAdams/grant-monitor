import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import Employee from '../libs/types/employee';

const prisma = new PrismaClient();

export async function createEmployee(req: Request, res: Response) {
try {
    const {
        uID,
        firstName,
        middleInitial,
        lastName,
        notes,
    } = req.body as Employee;

    // Validate that required fields are provided in the request
    if (!firstName || !lastName || !uID) {
      return res.status(400).json({ error: 'Required fields are missing in the request' });
    }

    const newEmployee = await prisma.employee.create({
      data: {
        uID,
        firstName,
        middleInitial,
        lastName,
        notes,
        user: {
          connect: {
            id: 6, // You may need to associate the employee with the authenticated user
          },
        },
      },
    });

    if (!newEmployee) {
      return res.status(500).json({ error: 'An error occurred while creating the employee' });
    }

    return res.status(201).json({ message: 'employee created successfully', employee: newEmployee });

  } catch (error) {
    console.error('Error creating employee:', error);
    return res.status(500).json({ error: 'An error occurred while creating the employee' });
  } finally {
    await prisma.$disconnect();
  }
}


export async function getEmployeeById(req: Request, res: Response) {
  try {
    // Extract the employee ID from the request parameters
    const employeeId = parseInt(req.params.id);

    if (isNaN(employeeId)) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      return res.status(404).json({ error: 'employee not found' });
    }

    return res.status(200).json({ message: 'employee found', employee });
  } catch (error) {
    console.error('Error getting employee by ID:', error);
    return res.status(500).json({ error: 'An error occurred while getting the employee by ID' });
  } finally {
    await prisma.$disconnect();
  }
}

export async function getEmployeeList(req: Request, res: Response) {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        userId: 6,
      },
    });

    if (!employees || employees.length === 0) {
      return res.status(404).json({ error: 'No employees found' });
    }

    return res.status(200).json({ message: 'employees found', employees });
  } catch (error) {
    console.error('Error getting employees:', error);
    return res.status(500).json({ error: 'An error occurred while getting the employees' });
  } finally {
    await prisma.$disconnect();
  }
}


export async function editEmployee(req: Request, res: Response) {
  try {
  // Extract the employee ID from the request parameters
  const employeeId = parseInt(req.params.id);

  if (isNaN(employeeId)) {
    return res.status(400).json({ error: 'Invalid employee ID', employeeId });
  }

  const {
    uID,
    firstName,
    middleInitial,
    lastName,
    notes,
  } = req.body as Employee;


  // Use Prisma to update the employee by ID
  const updatedEmployee = await prisma.employee.update({
    where: {
      id: employeeId,
    },
    data: {
      uID,
      firstName,
      middleInitial,
      lastName,
      notes,
    }
  });

  if (!updatedEmployee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  return res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
} catch (error) {
  console.error('Error editing employee:', error);
  return res.status(500).json({ error: 'An error occurred while editing the employee' });
} finally {
  await prisma.$disconnect();
}
}

export async function deleteEmployee(req: Request, res: Response) {
try {
  // Extract the employee ID from the request parameters
  const employeeId = parseInt(req.params.id);

  if (isNaN(employeeId)) {
    return res.status(400).json({ error: 'Invalid employee ID' });
  }

  // Use Prisma to delete the employee by ID
  const deletedEmployee = await prisma.employee.delete({
    where: {
      id: employeeId,
    },
  });

  if (!deletedEmployee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  return res.status(200).json({ message: 'Employee deleted successfully' });
} catch (error) {
  console.error('Error deleting employee:', error);
  return res.status(500).json({ error: 'An error occurred while deleting the employee' });
} finally {
  await prisma.$disconnect();
}
}
