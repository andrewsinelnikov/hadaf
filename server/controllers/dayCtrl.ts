import { Request, Response } from "express";
import Day from "../models/dayModel";
import { IReqAuth } from "../config/interface";

const planCtrl = {
  createDay: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { goal, text, period, count } = req.body;

      const newDay = new Day({
        goal,
        text,
        period,
        count,
      });

      await newDay.save();

      res.json({ newDay });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default planCtrl;
