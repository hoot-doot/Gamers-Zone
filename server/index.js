import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import multer from "multer";
import helmet from  "helmet";
import morgan  from "morgan"
import Transaction from "./models/Transaction.js";
import path  from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import ordersRoutes from "./routes/order.js";
// import userRoutes from "./routes/users.js";
import gameRoutes from "./routes/games.js";
import { register } from "./controllers/auth.js";
// import { sendResetEmail, verifyOtp, resetPassword } from "./controllers/auth.js";
import { getSingleGame }  from "./controllers/games.js";
// import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import bcrypt from "bcrypt";
// import Order from "./models/Order.js";
import { games} from "./data/index.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import refundRoutes from "./routes/refund.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.use('/api/refund', refundRoutes);

/* ROUTES */
app.get("/games/:id", getSingleGame);
// Define a route to handle form submissions
const KhaltiPayloadSchema = new mongoose.Schema({
  widget_id: String,
  status: Number,
  t: String,
  idx: String,
  token: String,
  amount: Number,
  bank_reference: String,
  mobile: String,
  product_identity: [String],
  product_name: String,
  product_url: String,
  purchase_order_id: String,
  purchase_order_name: String,
  transaction_id: String,
},{ timestamps: true });

// Create a new model using the schema
const KhaltiPayload = mongoose.model('KhaltiPayload', KhaltiPayloadSchema);

// Create a new document using the model and save the Khalti payload
app.post("/khalti", async (req, res) => {
  const khaltiPayloadData = req.body;

  try {
    const newKhaltiPayload = new KhaltiPayload(khaltiPayloadData);
    await newKhaltiPayload.save();
    res.status(201).json(newKhaltiPayload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/transactions", async (req, res) => {
  const { userId, cost, products } = req.body;

  try {
    const newTransaction = new Transaction({
      userId,
      cost,
      products: products.map(id => new mongoose.Types.ObjectId(id)),
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
app.use("/games", gameRoutes);

// app.use('/api/orders', ordersRoutes);
app.use('/api/payment', ordersRoutes)

  /* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // Order
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
      // Product.insertMany(games)
  })
  .catch((error) => console.log(`${error} did not connect`));


// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail", // or another email service provider
  auth: {
    user: "canshu911@gmail.com",
    pass: "qmys kkex rfmx usvf",
  },
});

// Route for sending the password reset email
app.post("/auth/send-reset-email", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "User doesn't exist" });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration
  await user.save();

  const mailOptions = {
    from: "devansh-email@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n
    Please use the following OTP to reset your password: ${resetToken}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json({ msg: "Email sent" });
    }
  });
});

// Route for verifying the OTP
app.get("/auth/verify-otp", async (req, res) => {
  const { code } = req.query;
  const user = await User.findOne({
    resetToken: code,
    // resetTokenExpiration: { $gt: new Date(Date.now()) },
  });

  if (!user) {
    return res.status(400).json({ err: "Invalid or expired OTP" });
  }

  return res.status(200).json({ msg: "OTP verified" });
});

// Route for resetting the password
app.put("/reset-password", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  try {
    // Hash the new password with a salt of 12 rounds
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    return res.status(200).json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }});