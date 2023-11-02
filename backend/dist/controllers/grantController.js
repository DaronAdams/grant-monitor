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
exports.deleteGrant = exports.editGrant = exports.getGrantList = exports.getGrantById = exports.createGrant = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createGrant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fund, organization, account, program, costShareIndex, cayuse, sponsor, status, totalAmount, startDate, endDate, index, yearlyAmount, } = req.body;
            // Validate that required fields are provided in the request
            if (!fund || !organization || !account || !program) {
                return res.status(400).json({ error: 'Required fields are missing in the request' });
            }
            const newGrant = yield prisma.grant.create({
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
        }
        catch (error) {
            console.error('Error creating grant:', error);
            return res.status(500).json({ error: 'An error occurred while creating the grant' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.createGrant = createGrant;
function getGrantById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract the grant ID from the request parameters
            const grantId = parseInt(req.params.id);
            if (isNaN(grantId)) {
                return res.status(400).json({ error: 'Invalid grant ID' });
            }
            const grant = yield prisma.grant.findUnique({
                where: {
                    id: grantId,
                },
            });
            if (!grant) {
                return res.status(404).json({ error: 'Grant not found' });
            }
            return res.status(200).json({ message: 'Grant found', grant });
        }
        catch (error) {
            console.error('Error getting grant by ID:', error);
            return res.status(500).json({ error: 'An error occurred while getting the grant by ID' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getGrantById = getGrantById;
function getGrantList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const grants = yield prisma.grant.findMany({
                where: {
                    userId: 6,
                },
            });
            if (!grants || grants.length === 0) {
                return res.status(404).json({ error: 'No grants found' });
            }
            return res.status(200).json({ message: 'Grants found', grants });
        }
        catch (error) {
            console.error('Error getting grants:', error);
            return res.status(500).json({ error: 'An error occurred while getting the grants' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.getGrantList = getGrantList;
function editGrant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract the grant ID from the request parameters
            const grantId = parseInt(req.params.id);
            if (isNaN(grantId)) {
                return res.status(400).json({ error: 'Invalid grant ID', grantId });
            }
            const { fund, organization, account, program, costShareIndex, cayuse, sponsor, status, totalAmount, startDate, index, endDate, yearlyAmount, } = req.body;
            // Use Prisma to update the grant by ID
            const updatedGrant = yield prisma.grant.update({
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
        }
        catch (error) {
            console.error('Error editing grant:', error);
            return res.status(500).json({ error: 'An error occurred while editing the grant' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.editGrant = editGrant;
function deleteGrant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract the grant ID from the request parameters
            const grantId = parseInt(req.params.id);
            if (isNaN(grantId)) {
                return res.status(400).json({ error: 'Invalid grant ID' });
            }
            // Use Prisma to delete the grant by ID
            const deletedGrant = yield prisma.grant.delete({
                where: {
                    id: grantId,
                },
            });
            if (!deletedGrant) {
                return res.status(404).json({ error: 'Grant not found' });
            }
            return res.status(200).json({ message: 'Grant deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting grant:', error);
            return res.status(500).json({ error: 'An error occurred while deleting the grant' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.deleteGrant = deleteGrant;
