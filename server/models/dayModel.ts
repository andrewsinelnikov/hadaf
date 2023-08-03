import mongoose from "mongoose";
import { IDay } from "../config/interface";

const daySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    plans: [
      {
        plan_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "plan",
        },
        done: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDay>("day", daySchema);
