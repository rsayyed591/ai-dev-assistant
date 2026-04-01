import User from "../models/user.model.js";

export const generateCommit = async (req, res, next) => {
  try {
    const { context, tone } = req.body;

    if (!context?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Context is required",
      });
    }

    const result = await generateAI(commitPrompt(context, tone));

    // ✅ Save history
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        history: {
          $each: [
            {
              type: "commit",
              input: context,
              output: result,
              tone,
            },
          ],
          $position: 0,
          $slice: 10,
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