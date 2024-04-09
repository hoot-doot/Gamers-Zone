import Game from "../models/Game.js";
import { ObjectId } from 'mongodb';


/* READ */
export const getGames = async (req, res) => {
  try {
    const game = await Game.find();
    res.status(200).json(game);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getSingleGame = async (req, res) => {
  const _id = req.params.id; // Changed from req.params._id to req.params.id
  if (!ObjectId.isValid(_id)) return res.status(404).send("Invalid Id");
  
  try {
    const game = await Game.findById(_id); // Make sure Game is properly imported or defined
    if (!game) return res.status(404).send("The game with the given ID was not found.");
    res.status(200).json(game);
  } catch (err) {
    res.status(500).send(err.message);
  }
}