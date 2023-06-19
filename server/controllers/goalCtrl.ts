import { Request, Response } from "express";
import Goal from "../models/goalModel";
import { IReqAuth } from "../config/interface";
import bcrypt from "bcrypt";

const goalCtrl = {
  createGoal: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { text } = req.body;

      const newGoal = new Goal({ user: req.user._id, text });
      await newGoal.save();

      res.json({ newGoal });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getGoals: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const goals = await Goal.find().sort("-createdAt");
      res.json({ goals });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateGoal: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      await Goal.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { text: req.body.text }
      );

      res.json({ msg: "Update Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteGoal: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const goal = await Goal.findByIdAndDelete(req.params.id);
      if (!goal) return res.status(400).json({ msg: "Goal does not exist" });

      res.json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default goalCtrl;
