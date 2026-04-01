import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import rephraseRoutes from "./routes/rephrase.route.js";
import commitRoutes from "./routes/commit.route.js";
import authRoutes from "./routes/auth.route.js";
import historyRoutes from "./routes/history.route.js";
import profileRoutes from "./routes/profile.route.js";

import { verifyToken } from "./middleware/auth.middleware.js";
import { apiLimiter } from "./middleware/rateLimit.middleware.js";

dotenv.config();

// ✅ FIRST create app
const app = express();

// ✅ THEN connect DB
connectDB();

app.use(cors());
app.use(express.json());
app.set("trust proxy", 1);
// ✅ Public route
app.use("/api/auth", authRoutes);

// ✅ Protected routes
app.use("/api/rephrase", verifyToken, apiLimiter, rephraseRoutes);
app.use("/api/commit", verifyToken, apiLimiter, commitRoutes);
app.use("/api/history", verifyToken, historyRoutes);
app.use("/api/profile", verifyToken, profileRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "API running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});