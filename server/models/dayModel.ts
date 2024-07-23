import mongoose from "mongoose";
import { IDay } from "../config/interface";

const daySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    plans: {
      type: [
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
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDay>("day", daySchema);
