import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getKhaltiTransactions,
  deleteProduct
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/khalti", getKhaltiTransactions);
router.delete("/products/:id", deleteProduct);

export default router;
