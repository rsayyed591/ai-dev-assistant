import User from "../models/user.model.js";

export const getHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("history");

    res.json({
      success: true,
      data: user.history,
    });
  } catch (error) {
    next(error);
  }
};