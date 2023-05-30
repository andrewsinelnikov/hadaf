import { Request, Response } from "express";
import User from "../models/userModel";
import { IReqAuth } from "../config/interface";
import bcrypt from "bcrypt";

const userCtrl = {
  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { image, name, usta, bbook } = req.body;

      await User.findOneAndUpdate(
        { _id: req.user._id },
        { image, name, usta, bbook }
      );

      res.json({ msg: "Update Success" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    if (req.user.type !== "register")
      return res.status(400).json({
        msg: `Quick login account with ${req.user.type} can't use this function`,
      });

    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await User.findOneAndUpdate(
        { _id: req.user._id },
        { password: passwordHash }
      );

      res.json({ msg: "Reset Password Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
