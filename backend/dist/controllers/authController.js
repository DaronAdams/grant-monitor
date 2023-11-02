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
exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const emailVerifyer_1 = require("../libs/utils/emailVerifyer");
const prisma = new client_1.PrismaClient();
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Check if the email is already registered
            const existingUser = yield prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already registered' });
            }
            // Create a new user
            const newUser = yield prisma.user.create({
                data: { email, password },
            });
            if ((0, emailVerifyer_1.checkValidEmail)(email) === false) {
                return res.status(400).json({ message: 'Email is not valid' });
            }
            return res.status(201).json({ message: 'User registered successfully', user: newUser });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Check if the email is already registered
            const existingUser = yield prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!existingUser) {
                return res.status(400).json({ message: 'Email is not registered' });
            }
            if (password !== existingUser.password) {
                return res.status(400).json({ message: 'Password is incorrect' });
            }
            return res.status(200).json({ message: 'User logged in successfully', user: existingUser });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
exports.loginUser = loginUser;
