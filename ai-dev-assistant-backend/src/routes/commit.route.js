import express from "express";
import { generateCommit } from "../controllers/commit.controller.js";

const router = express.Router();

router.post("/", generateCommit);

export default router;