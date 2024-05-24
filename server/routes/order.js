import express from 'express';
import {  makePayment  } from '../controllers/order.js';

const router = express.Router();

// router.post('/', createOrder);
router.post('/', makePayment );

export default router;