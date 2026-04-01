import User from "../models/user.model.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password"); // exclude password

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};