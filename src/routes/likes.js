import express from "express";
import { likeTweet } from "../controllers/likeContoller.js";

const router = express.Router();

router.post("/:id", likeTweet);

export default router;
