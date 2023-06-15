import mongoose from "mongoose";
import { IUser } from "../config/interface";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxLength: [25, "Your name is up to 25 chars long"],
    },
    account: {
      type: String,
      required: [true, "Please provide your email or phone"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [8, "Password must be at least 8 chars long"],
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dige7jdhc/image/upload/v1684831419/hadaf/lnlwfqzgt8nkwhgpn09c.png",
      // "https://res.cloudinary.com/dige7jdhc/image/upload/v1648315275/hadaf/user_w98gce.png",
    },
    usta: {
      type: String,
      default: "https://www.usta.com/",
    },
    bbook: {
      type: String,
      default: "https://www.bbook.com/",
    },
    role: {
      type: String,
      default: "user", //admin
    },
    type: {
      type: String,
      default: "register", //login
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("user", userSchema);
