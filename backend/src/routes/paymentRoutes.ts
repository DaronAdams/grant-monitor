import express from 'express';
import { createPayment, getPaymentsForGrant } from '../controllers/paymentsController';

const router = express.Router();

// TODO: Define all the routes here
router.get('/list/laborReport', getPaymentsForGrant);
router.post('/create-payment', createPayment)

export default router;