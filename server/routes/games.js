import express from "express";
import { getGames} from "../controllers/games.js";
// import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// router.get("/", verifyToken, getGames);
router.get("/", getGames);


export default router;