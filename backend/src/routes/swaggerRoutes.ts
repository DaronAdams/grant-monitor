import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const router = express.Router();

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Grant Management System API Docs',
      version: '1.0.0',
    },
  },
  apis: ['./*.ts'],
};


const openapiSpecification = swaggerJsdoc(options);



router.use('/', swaggerUi.serve); // Change the route path here
router.get('/', swaggerUi.setup(openapiSpecification)); // Change the route path here

export default router;
