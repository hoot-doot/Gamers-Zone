import mongoose from "mongoose";
import stripe from "stripe";
import Product from "../models/Product.js";
import dotenv from 'dotenv';
dotenv.config();


const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);


// export const createOrder = async (req, res) => {
//   const { products, userName, email } = req.body;

//   try {
//     // Retrieve item information
//     const lineItems = await Promise.all(
//       products.map(async (product) => {
//         const item = await Product.findOne(product._id);
        
//         return {
//           price_data: {
//             currency: "nrp",
//             product_data: {
//               name: item.name,
//             },
//             unit_amount: item.price * 100,
//           },
//           quantity: product.count,
//         };
//       })
//     );



//     // Create a Stripe session
//     const session = await stripeClient.checkout.sessions.create({
//       payment_method_types: ["card"],
//       customer_email: email,
//       mode: "payment",
//       success_url: "http://localhost:3001/checkout/success",
//       cancel_url: "http://localhost:3001",
//       line_items: lineItems,
//     });

//     // Create the order
//     const order = await Order.create({
//       products,
//       userName,
//       email,
//       stripeSessionId: session.id,
//     });

//     // Return the session ID
//     return res.json({ id: session.id });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return res.status(500).json({ error: "There was a problem creating the order" });
//   }
// };

 

export const makePayment= async(req, res)=>{
  console.log('chalyo')
let config = {
  // replace this key with yours
  "publicKey": "test_secret_key_436a5dcd56b44272b64241a359f2c144",
  "productIdentity": "1234567890",
  "productName": "Drogon",
  "productUrl": "http://gameofthrones.com/buy/Dragons",
  "eventHandler": {
      onSuccess (payload) {
          // hit merchant api for initiating verfication
          console.log(payload);
      },
      // onError handler is optional
      onError (error) {
          // handle errors
          console.log(error);
      },
      onClose () {
          console.log('widget is closing');
      }
  },
  "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};
let checkout = new KhaltiCheckout(config);

return res.json("works");
}; 