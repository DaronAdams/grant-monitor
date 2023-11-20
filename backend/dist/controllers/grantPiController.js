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
exports.deleteGrantPiBridge = exports.editGrantPiBridge = exports.getGrantPiBridgeList = exports.getGrantPiBridgeListByGrantId = exports.getGrantPiBridgeByEmployeeAndGrantId = exports.getGrantPiBridgeById = exports.createGrantPiBridge = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createGrantPiBridge(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { academicYearEffort, costShareEffort, summerEffort, credit, startDate, endDate, isCoPI, grantId, employeeId, } = req.body;
            //console.log(req.body)
            // Validate that required fields are provided in the request
            if (!startDate || !grantId || !employeeId) {
                return res.status(400).json({ error: 'Required fields are missing in the request' });
            }
            const newGrantPiBridge = yield prisma.grantPIBridge.create({
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
        }
        catch (error) {
            console.error('Error creating grantPiBridge:', error);
            return res.status(500).json({ error: 'An error occurred while creating the grantPiBridge' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.createGrantPiBridge = createGrantPiBridge;
function getGrantPiBridgeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract the grantPiBridge ID from the request parameters
            const grantPiBridgeId = parseInt(req.params.id);
            if (isNaN(grantPiBridgeId)) {
                return res.status(400).json({ error: 'Invalid grantPiBridge ID' });
            }
            const grantPiBridge = yield prisma.grantPIBridge.findUnique({
                where: {
                    id: grantPiBridgeId,
                },
            });
            if (!grantPiBridge) {
                return res.status(404).json({ error: 'GrantPiBridge not found' });
            }
            return res.status(200).json({ message: 'GrantPiBridge found', grantPiBridge });
        }
        catch (error) {
            console.error('Error getting grantPiBridge by ID:', error);
            return res.status(500).json({ error: 'An error occurred while getting the grantPiBridge by ID' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getGrantPiBridgeById = getGrantPiBridgeById;
function getGrantPiBridgeByEmployeeAndGrantId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { employeeId, grantId } = req.body;
            console.log(req.body);
            // Validate that required fields are provided in the request body
            if (isNaN(employeeId) || isNaN(grantId)) {
                return res.status(400).json({ error: 'Invalid employee ID or grant ID' });
            }
            const grantPiBridge = yield prisma.grantPIBridge.findFirst({
                where: {
                    employeeId: employeeId,
                    grantId: grantId,
                },
            });
            if (!grantPiBridge) {
                return res.status(404).json({ error: 'GrantPIBridge not found' });
            }
            return res.status(200).json({ message: 'GrantPIBridge found', grantPiBridge });
        }
        catch (error) {
            console.error('Error getting GrantPIBridge by Employee and Grant ID:', error);
            return res.status(500).json({ error: 'An error occurred while getting the GrantPIBridge by Employee and Grant ID' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getGrantPiBridgeByEmployeeAndGrantId = getGrantPiBridgeByEmployeeAndGrantId;
function getGrantPiBridgeListByGrantId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { grantId } = req.body;
            console.log(req.body);
            // Validate that required fields are provided in the request body
            if (isNaN(grantId)) {
                return res.status(400).json({ error: 'Invalid grant ID' });
            }
            const grantPiBridge = yield prisma.grantPIBridge.findMany({
                where: {
                    grantId: grantId,
                },
            });
            if (!grantPiBridge) {
                return res.status(404).json({ error: 'grantPiBridge not found' });
            }
            return res.status(200).json({ message: 'grantPiBridge found', grantPiBridge });
        }
        catch (error) {
            console.error('Error getting grantPiBridge by Grant ID:', error);
            return res.status(500).json({ error: 'An error occurred while getting the grantPiBridge and Grant ID' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getGrantPiBridgeListByGrantId = getGrantPiBridgeListByGrantId;
function getGrantPiBridgeList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const grantPiBridges = yield prisma.grantPIBridge.findMany({});
            if (!grantPiBridges || grantPiBridges.length === 0) {
                return res.status(404).json({ error: 'No grantPiBridges found' });
            }
            return res.status(200).json({ message: 'GrantPiBridges found', grantPiBridges });
        }
        catch (error) {
            console.error('Error getting grantPiBridges:', error);
            return res.status(500).json({ error: 'An error occurred while getting the grantPiBridges' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getGrantPiBridgeList = getGrantPiBridgeList;
function editGrantPiBridge(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract the grantPiBridge ID from the request parameters
            const grantPiBridgeId = parseInt(req.params.id);
            if (isNaN(grantPiBridgeId)) {
                return res.status(400).json({ error: 'Invalid grantPiBridge ID', grantPiBridgeId });
            }
            const { academicYearEffort, costShareEffort, summerEffort, credit, startDate, endDate, isCoPI, grantId, employeeId, } = req.body;
            // Use Prisma to update the grantPiBridge by ID
            const updatedGrantPiBridge = yield prisma.grantPIBridge.update({
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
        }
        catch (error) {
            console.error('Error editing grantPiBridge:', error);
            return res.status(500).json({ error: 'An error occurred while editing the grantPiBridge' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.editGrantPiBridge = editGrantPiBridge;
function deleteGrantPiBridge(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract the grantPiBridge ID from the request parameters
            const grantPiBridgeId = parseInt(req.params.id);
            if (isNaN(grantPiBridgeId)) {
                return res.status(400).json({ error: 'Invalid grantPiBridge ID' });
            }
            // Use Prisma to delete the grantPiBridge by ID
            const deletedGrantPiBridge = yield prisma.grantPIBridge.delete({
                where: {
                    id: grantPiBridgeId,
                },
            });
            if (!deletedGrantPiBridge) {
                return res.status(404).json({ error: 'GrantPiBridge not found' });
            }
            return res.status(200).json({ message: 'GrantPiBridge deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting grantPiBridge:', error);
            return res.status(500).json({ error: 'An error occurred while deleting the grantPiBridge' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.deleteGrantPiBridge = deleteGrantPiBridge;
