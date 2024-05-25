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
import { getSingleGame }  from "./controllers/games.js";
// import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
import Product from "./models/Product.js";
// import Order from "./models/Order.js";
import { games} from "./data/index.js";

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