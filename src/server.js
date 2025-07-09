// backend/index.js

// 1. Import necessary packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// 2. Load environment variables from .env file
dotenv.config();

// 3. Initialize Express app
const app = express();

// 4. Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// 5. Import modular route handlers
import tweetRoutes from "./routes/tweets.js";
import followRoutes from "./routes/follows.js";
import userRoutes from "./routes/users.js";
import likeRoutes from "./routes/likes.js";
import timelineRoutes from "./routes/timeline.js";

// 6. Health check route
app.get("/", (req, res) => {
  res.send("🚀 Twitter clone backend is running");
});

// 7. Register all routes
app.use("/tweets", tweetRoutes);
app.use("/follow", followRoutes);
app.use("/users", userRoutes);
app.use("/likes", likeRoutes);
app.use("/timeline", timelineRoutes);

// 8. Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
