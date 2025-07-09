import express from "express";
import { followUser } from "../controllers/followController.js";

const router = express.Router();

router.post("/:id", followUser);

export default router;
