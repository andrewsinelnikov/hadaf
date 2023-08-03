import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Day from "../models/dayModel";
import PlanItem from "../models/planModel";

const planCtrl = {
  createDay: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { date } = req.body;

      const newDay = new Day({ date });

      await newDay.save();

      const planItems = await PlanItem.find({ period: "daily" });

      for (const planItem of planItems) {
        newDay.plans.push(planItem._id);
      }

      res.json({ newDay });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default planCtrl;
