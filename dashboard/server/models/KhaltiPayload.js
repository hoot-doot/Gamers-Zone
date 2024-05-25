import mongoose from "mongoose";

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
  },
  { timestamps: true });
  
  // Create a new model using the schema
  const KhaltiPayload = mongoose.model('KhaltiPayload', KhaltiPayloadSchema);
  export default KhaltiPayload;
