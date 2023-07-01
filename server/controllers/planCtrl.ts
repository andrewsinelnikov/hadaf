import { Request, Response } from "express";
import Goal from "../models/goalModel";
import PlanItem from "../models/planModel";
import { IReqAuth } from "../config/interface";
import bcrypt from "bcrypt";

const planCtrl = {
  createPlanItem: async (req: IReqAuth, res: Response) => {
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
  // getGoals: async (req: IReqAuth, res: Response) => {
  //   if (!req.user)
  //     return res.status(400).json({ msg: "Invalid Authentication" });

  //   try {
  //     const goals = await Goal.find().sort("-createdAt");
  //     res.json({ goals });
  //   } catch (err: any) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },
  // getCurrentGoals: async (req: IReqAuth, res: Response) => {
  //   if (!req.user)
  //     return res.status(400).json({ msg: "Invalid Authentication" });

  //   try {
  //     const date = new Date();
  //     const season = getSeason(date);

  //     const startDates = {
  //       spring: new Date(`${date.getFullYear()}-03-01`),
  //       summer: new Date(`${date.getFullYear()}-06-01`),
  //       autumn: new Date(`${date.getFullYear()}-09-01`),
  //       winter: new Date(`${date.getFullYear()}-12-01`),
  //     };

  //     const seasonStart = startDates[season];

  //     let nextSeasonStart;
  //     if (season === "winter") {
  //       nextSeasonStart = new Date(`1 Mar ${date.getFullYear() + 1}`);
  //     } else {
  //       nextSeasonStart = Object.values(startDates).find(
  //         (date) => date > seasonStart
  //       );
  //     }

  //     const goals = await Goal.find({
  //       createdAt: {
  //         $gte: seasonStart,
  //         $lt: nextSeasonStart,
  //       },
  //     });
  //     res.json({ goals });

  //   } catch (err: any) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },
  // updateGoal: async (req: IReqAuth, res: Response) => {
  //   if (!req.user)
  //     return res.status(400).json({ msg: "Invalid Authentication" });

  //   try {
  //     await Goal.findOneAndUpdate(
  //       {
  //         _id: req.params.id,
  //       },
  //       { text: req.body.text }
  //     );

  //     res.json({ msg: "Update Success!" });
  //   } catch (err: any) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },
  // deleteGoal: async (req: IReqAuth, res: Response) => {
  //   if (!req.user)
  //     return res.status(400).json({ msg: "Invalid Authentication" });

  //   try {
  //     const goal = await Goal.findByIdAndDelete(req.params.id);
  //     if (!goal) return res.status(400).json({ msg: "Goal does not exist" });

  //     res.json({ msg: "Delete Success!" });
  //   } catch (err: any) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },
};

export default planCtrl;
