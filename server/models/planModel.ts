import mongoose from "mongoose";
import { IGoal } from "../config/interface";

const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    text: {
      type: String,
      required: [true, "Please type your goal"],
      trim: true,
      maxLength: [200, "Your goal is up to 200 chars long"],
    },
    completeness: {
      type: Number,
      required: true,
      default: 1,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGoal>("goal", goalSchema);
