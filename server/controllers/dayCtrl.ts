import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Day from "../models/dayModel";
import PlanItem from "../models/planModel";
import { getSeason } from "../config/getSeason";

const dayCtrl = {
  createDay: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { date } = req.body;
      const currentDate = new Date(date);

      const newDay = new Day({ currentDate });

      // await newDay.save();

      //
      const season = getSeason(currentDate);

      const startDates = {
        spring: new Date(`${currentDate.getFullYear()}-03-01`),
        summer: new Date(`${currentDate.getFullYear()}-06-01`),
        autumn: new Date(`${currentDate.getFullYear()}-09-01`),
        winter: new Date(`${currentDate.getFullYear()}-12-01`),
      };

      const seasonStart = startDates[season];

      let nextSeasonStart;
      if (season === "winter") {
        nextSeasonStart = new Date(`1 Mar ${currentDate.getFullYear() + 1}`);
      } else {
        nextSeasonStart = Object.values(startDates).find(
          (date) => date > seasonStart
        );
      }

      //

      const planItems = await PlanItem.find({
        period: "Daily",
        createdAt: {
          $gte: seasonStart,
          $lt: nextSeasonStart,
        },
      });

      for (const planItem of planItems) {
        newDay.plans.push({ plan_id: planItem._id, done: false });
      }

      await newDay.save();

      res.json({ newDay });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default dayCtrl;
