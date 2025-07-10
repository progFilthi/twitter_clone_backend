import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);

export default router;


//JWT 