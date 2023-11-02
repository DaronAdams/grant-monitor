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
router.put('/edit/:id', grantController_1.editGrant);
router.delete('/delete/:id', grantController_1.deleteGrant);
router.get('/:id', grantController_1.getGrantById);
router.get('/list/grants', grantController_1.getGrantList);
exports.default = router;
