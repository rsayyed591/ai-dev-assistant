import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  keyGenerator: (req) => {
    return req.user?.id || ipKeyGenerator(req); // ✅ FIX
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, slow down.",
    });
  },
});