import express from "express";
import { login } from "../controllers/auth.js";
// import { sendResetEmail, verifyOtp, resetPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
// router.post("/send-reset-email", sendResetEmail);
// router.post("/verify-otp", verifyOtp);
// router.put("/reset-password", resetPassword);
export default router;