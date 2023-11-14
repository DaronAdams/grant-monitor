"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const grantEmpController_1 = require("../controllers/grantEmpController");
const router = express_1.default.Router();
// TODO: Define all the routes here
router.post('/create', grantEmpController_1.createGrantEmployeeBridge);
router.put('/edit/:id', grantEmpController_1.editGrantEmployeeBridge);
router.delete('/delete/:id', grantEmpController_1.deleteGrantEmployeeBridge);
router.get('/:id', grantEmpController_1.getGrantEmployeeBridgeById);
router.get('/list/employees', grantEmpController_1.getGrantEmployeeBridgeList);
router.get('/from/GrantAndEmployee', grantEmpController_1.getGrantEmployeeBridgeByEmployeeAndGrantId);
router.get('/from/Grant', grantEmpController_1.getGrantEmployeeBridgeListByGrantId);
exports.default = router;
