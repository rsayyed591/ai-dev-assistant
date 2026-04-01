import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["rephrase", "commit"],
      required: true,
    },
    input: String,
    output: String,
    tone: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    history: {
      type: [historySchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);