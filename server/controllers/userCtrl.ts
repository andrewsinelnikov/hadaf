import { Request, Response } from "express";
import User from "../models/userModel";
import { IReqAuth } from "../config/interface";
import bcrypt from "bcrypt";

const userCtrl = {
  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { avatar, name } = req.body;

      await User.findOneAndUpdate({ _id: req.user._id }, { avatar, name });

      res.json({ msg: "Update Success" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
