import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "../src/config/db.js";

import rephraseRoutes from "../src/routes/rephrase.route.js";
import commitRoutes from "../src/routes/commit.route.js";
import authRoutes from "../src/routes/auth.route.js";
import historyRoutes from "../src/routes/history.route.js";
import profileRoutes from "../src/routes/profile.route.js";

import { verifyToken } from "../src/middleware/auth.middleware.js";
import { apiLimiter } from "../src/middleware/rateLimit.middleware.js";

dotenv.config();

const app = express();

// IMPORTANT: connect DB once
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rephrase", verifyToken, apiLimiter, rephraseRoutes);
app.use("/api/commit", verifyToken, apiLimiter, commitRoutes);
app.use("/api/history", verifyToken, historyRoutes);
app.use("/api/profile", verifyToken, profileRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "API running" });
});

export default app;