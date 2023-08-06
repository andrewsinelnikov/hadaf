import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Day from "../models/dayModel";
import PlanItem from "../models/planModel";
import { getSeason } from "../config/getSeason";

const planCtrl = {
  createDay: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { date } = req.body;

      const newDay = new Day({ date });

      await newDay.save();

      //
      const today = new Date();
      const season = getSeason(today);

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

      //

      const planItems = await PlanItem.find({ period: "Daily" });

      for (const planItem of planItems) {
        newDay.plans.push({ plan_id: planItem._id, done: false });
      }

      res.json({ newDay });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default planCtrl;
