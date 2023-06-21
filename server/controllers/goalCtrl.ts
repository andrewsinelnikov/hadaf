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
  getCurrentGoals: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      let date = new Date();
      let goals;
      switch (date.getMonth()) {
        case 0:
        case 1:
          goals = await Goal.find({
            $and: [
              {
                createdAt: {
                  $gte: new Date(`${date.getFullYear() - 1}-11-30`),
                },
              },
              { createdAt: { $lte: new Date(`${date.getFullYear()}-2-1`) } },
            ],
          });
          break;
        case 11:
          goals = await Goal.find({
            $and: [
              {
                createdAt: {
                  $gte: new Date(`${date.getFullYear() - 1}-11-30`),
                },
              },
              { createdAt: { $lte: new Date(`${date.getFullYear()}-11-30`) } },
            ],
          });
          break;
        case 2:
        case 3:
        case 4:
          date.setDate(1);
          date.setMonth(5);
          date.setHours(0, 0, 0);
          break;
        case 5:
        case 6:
        case 7:
          date.setDate(1);
          date.setMonth(8);
          date.setHours(0, 0, 0);
          break;
        case 8:
        case 9:
        case 10:
          date.setDate(1);
          date.setMonth(11);
          date.setHours(0, 0, 0);
          break;
      }

      // const goals = await Goal.find().sort("-createdAt");
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
