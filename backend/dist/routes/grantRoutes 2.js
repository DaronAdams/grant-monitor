"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const grantController_1 = require("../controllers/grantController");
const router = express_1.default.Router();
// TODO: Define all the routes here
router.post('/create', grantController_1.createGrant);
exports.default = router;
