import { Request, Response } from "express";
import PlanItem from "../models/planModel";
import Goal from "../models/goalModel";
import { IReqAuth } from "../config/interface";
import bcrypt from "bcrypt";
import { getSeason } from "../config/getSeason";

const planCtrl = {
  createPlanItem: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { goal, text, count } = req.body;

      const newPlanItem = new PlanItem({
        goal,
        text,
        count,
      });

      // await Goal.findOneAndUpdate(
      //   { _id: goal },
      //   {
      //     $set: {
      //       completeness: { $add: ["$completeness", count] },
      //     },
      //   }
      // );
      await newPlanItem.save();

      res.json({ newPlanItem });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCurrentPlans: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const date = new Date();
      const season = getSeason(date);

      const startDates = {
        spring: new Date(`${date.getFullYear()}-03-01`),
        summer: new Date(`${date.getFullYear()}-06-01`),
        autumn: new Date(`${date.getFullYear()}-09-01`),
        winter: new Date(`${date.getFullYear()}-12-01`),
      };

      const seasonStart = startDates[season];

      let nextSeasonStart;
      if (season === "winter") {
        nextSeasonStart = new Date(`1 Mar ${date.getFullYear() + 1}`);
      } else {
        nextSeasonStart = Object.values(startDates).find(
          (date) => date > seasonStart
        );
      }

      const plans = await PlanItem.find({
        createdAt: {
          $gte: seasonStart,
          $lt: nextSeasonStart,
        },
      });
      res.json({ plans });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPlansByGoal: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const plans = await PlanItem.find({ goal: req.params.goal });
      res.json({ plans });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePlanItem: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      await PlanItem.findOneAndUpdate(
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
  deletePlanItem: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const planItem = await PlanItem.findByIdAndDelete(req.params.id);
      if (!planItem)
        return res.status(400).json({ msg: "Plan item does not exist" });

      res.json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default planCtrl;
