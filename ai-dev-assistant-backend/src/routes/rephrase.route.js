import express from "express";
import { rephraseText } from "../controllers/rephrase.controller.js";

const router = express.Router();

router.post("/", rephraseText);

export default router;