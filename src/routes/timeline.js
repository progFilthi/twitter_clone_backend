import express from "express";
import { getTimeline } from "../controllers/timelineControler.js";

const router = express.Router();

router.get("/:id", getTimeline);

export default router;
