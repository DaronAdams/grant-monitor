"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const router = express_1.default.Router();
const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Grant Management System API Docs',
            version: '1.0.0',
        },
    },
    apis: ['./*.ts'],
};
const openapiSpecification = (0, swagger_jsdoc_1.default)(options);
router.use('/', swagger_ui_express_1.default.serve); // Change the route path here
router.get('/', swagger_ui_express_1.default.setup(openapiSpecification)); // Change the route path here
exports.default = router;
