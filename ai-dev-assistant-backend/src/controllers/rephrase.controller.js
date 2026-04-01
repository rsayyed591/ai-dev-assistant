import User from "../models/user.model.js";
import { generateAI } from "../services/groq.service.js";
import { rephrasePrompt } from "../utils/prompts.js";

export const rephraseText = async (req, res, next) => {
  try {
    const { text, tone } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const result = await generateAI(rephrasePrompt(text, tone));

    // ✅ Save history
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        history: {
          $each: [
            {
              type: "rephrase",
              input: text,
              output: result,
              tone,
            },
          ],
          $position: 0, // newest first
          $slice: 10,   // keep only 10
        },
      },
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};