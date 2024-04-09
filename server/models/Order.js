import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  product: {
    type: Object,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  stripeSessionId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
