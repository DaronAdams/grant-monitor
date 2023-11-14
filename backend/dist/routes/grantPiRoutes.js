"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const grantPiController_1 = require("../controllers/grantPiController");
const router = express_1.default.Router();
// TODO: Define all the routes here
router.post('/create', grantPiController_1.createGrantPiBridge);
router.put('/edit/:id', grantPiController_1.editGrantPiBridge);
router.delete('/delete/:id', grantPiController_1.deleteGrantPiBridge);
router.get('/:id', grantPiController_1.getGrantPiBridgeById);
router.get('/list/pis', grantPiController_1.getGrantPiBridgeList);
router.get('/from/GrantAndEmployee', grantPiController_1.getGrantPiBridgeByEmployeeAndGrantId);
router.get('/from/Grant', grantPiController_1.getGrantPiBridgeListByGrantId);
exports.default = router;
