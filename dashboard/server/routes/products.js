// routes/products.js
import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import Product from "../models/Product.js";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'products',
    allowedFormats: ['jpg', 'png'],
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.array('picturePath', 10), async (req, res) => {
  try {
    const { name, shortDescription, longDescription, price, category, platform, rating, creator } = req.body;
    const picturePaths = req.files.map(file => file.path);

    const newProduct = new Product({
      name,
      shortDescription,
      longDescription,
      price,
      picturePath: picturePaths,
      category: JSON.parse(category),
      platform: JSON.parse(platform),
      rating,
      creator,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product', error });
  }
});

export default router;
