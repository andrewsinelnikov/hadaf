import mongoose from "mongoose";
import { IPlan } from "../config/interface";

const planSchema = new mongoose.Schema(
  {
    goal: { type: mongoose.Types.ObjectId, ref: "goal" },
    text: {
      type: String,
      required: [true, "Please type a plan iten"],
      trim: true,
      maxLength: [200, "Your plan item is up to 200 chars long"],
    },
    count: {
      type: Number,
      required: true,
      default: 1,
    },
    completeness: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPlan>("plan", planSchema);
