import express from 'express';
import multer from 'multer';
import { handleRefund } from '../controllers/refund.js';

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/', upload.single('image'), handleRefund);

export default router;