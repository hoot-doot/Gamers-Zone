import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
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
        type: Array,
        default: [],
    },
    category: {
        type: Array,
        default: [],
    },
    platform: {
        type: Array,
    },
    rating: {
        type: Number,
    },
    creator: {
        type: String,
    }
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", GameSchema);
export default Game;