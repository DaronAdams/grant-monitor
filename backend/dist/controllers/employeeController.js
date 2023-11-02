"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getemployeeList = exports.getemployeeById = exports.createEmployee = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { uID, firstName, middleInitial, lastName, notes, } = req.body;
            // Validate that required fields are provided in the request
            if (!firstName || !lastName || !uID) {
                return res.status(400).json({ error: 'Required fields are missing in the request' });
            }
            const newEmployee = yield prisma.employee.create({
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
        }
        catch (error) {
            console.error('Error creating employee:', error);
            return res.status(500).json({ error: 'An error occurred while creating the employee' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.createEmployee = createEmployee;
function getemployeeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract the employee ID from the request parameters
            const employeeId = parseInt(req.params.id);
            if (isNaN(employeeId)) {
                return res.status(400).json({ error: 'Invalid employee ID' });
            }
            const employee = yield prisma.employee.findUnique({
                where: {
                    id: employeeId,
                },
            });
            if (!employee) {
                return res.status(404).json({ error: 'employee not found' });
            }
            return res.status(200).json({ message: 'employee found', employee });
        }
        catch (error) {
            console.error('Error getting employee by ID:', error);
            return res.status(500).json({ error: 'An error occurred while getting the employee by ID' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getemployeeById = getemployeeById;
function getemployeeList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const employees = yield prisma.employee.findMany({
                where: {
                    userId: 6,
                },
            });
            if (!employees || employees.length === 0) {
                return res.status(404).json({ error: 'No employees found' });
            }
            return res.status(200).json({ message: 'employees found', employees });
        }
        catch (error) {
            console.error('Error getting employees:', error);
            return res.status(500).json({ error: 'An error occurred while getting the employees' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getemployeeList = getemployeeList;
