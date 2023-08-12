import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Day from "../models/dayModel";
import PlanItem from "../models/planModel";
import { getSeasonStartEndDates } from "../config/getSeason";

const dayCtrl = {
  createDay: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { date } = req.body;
      const currentDate = new Date(date);

      const newDay = new Day({ date: currentDate });

      const { seasonStart, nextSeasonStart } =
        getSeasonStartEndDates(currentDate);

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
  getDay: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { date } = req.params;
      // const selectedDate = new Date(req.params.date)
      //   .toISOString()
      //   .split("T")[0];

      const query = {
        date: { $regex: /^" + date + "/ },
      };
      console.log(date + " " + query.date);

      const day = await Day.findOne({
        query,
      });
      // if (!day) return res.status(400).json({ msg: "No records for this day" });

      res.json({ day });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default dayCtrl;
