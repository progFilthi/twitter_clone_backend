import express from "express";
import { createTweet, getTweets } from "../controllers/tweetController.js";

const router = express.Router();

router.post("/", createTweet);
router.get("/", getTweets);

export default router;
