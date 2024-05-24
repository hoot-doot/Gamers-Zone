import mongoose from "mongoose";

const GearSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String, 
    },
    longDescription: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    picturePath: {
        type: String,
    },
    rating: {
        type: Number,
    },
  },
  { timestamps: true }
);

const Gear = mongoose.model("Gear", GearSchema);
export default Gear;
