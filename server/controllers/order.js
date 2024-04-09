import mongoose from "mongoose";
import stripe from "stripe";
import User from "../models/Game.js";
import dotenv from 'dotenv';
dotenv.config();


const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);


export const createOrder = async (req, res) => {
  const { products, userName, email } = req.body;

  try {
    // Retrieve item information
    const lineItems = await Promise.all(
      products.map(async (product) => {
        const item = await Game.findOne(product.name);
        
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: product.count,
        };
      })
    );



    // Create a Stripe session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      mode: "payment",
      success_url: "http://localhost:3001/checkout/success",
      cancel_url: "http://localhost:3001",
      line_items: lineItems,
    });

    // Create the order
    const order = await Order.create({
      products,
      userName,
      email,
      stripeSessionId: session.id,
    });

    // Return the session ID
    return res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "There was a problem creating the order" });
  }
};