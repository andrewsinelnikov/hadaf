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

      const goals = await Goal.find({
        createdAt: {
          $gte: seasonStart,
          $lt: nextSeasonStart,
        },
      });
      res.json({ goals });
      // let date = new Date();
      // let goals;
      // switch (date.getMonth()) {
      //   case 0:
      //   case 1:
      //     goals = await Goal.find({
      //       $and: [
      //         {
      //           createdAt: {
      //             $gte: new Date(`${date.getFullYear() - 1}-11-30`),
      //           },
      //         },
      //         { createdAt: { $lte: new Date(`${date.getFullYear()}-02-01`) } },
      //       ],
      //     });
      //     break;
      //   case 11:
      //     goals = await Goal.find({
      //       $and: [
      //         {
      //           createdAt: {
      //             $gte: new Date(`${date.getFullYear()}-11-30`),
      //           },
      //         },
      //         {
      //           createdAt: {
      //             $lte: new Date(`${date.getFullYear() + 1}-02-01`),
      //           },
      //         },
      //       ],
      //     });
      //     break;
      //   case 2:
      //   case 3:
      //   case 4:
      //     goals = await Goal.find({
      //       $and: [
      //         {
      //           createdAt: {
      //             $gte: new Date(
      //               `${date.getFullYear()}-01-${
      //                 leapYear(date.getFullYear()) ? 29 : 28
      //               }`
      //             ),
      //           },
      //         },
      //         {
      //           createdAt: {
      //             $lte: new Date(`${date.getFullYear()}-05-01`),
      //           },
      //         },
      //       ],
      //     });
      //     break;
      //   case 5:
      //   case 6:
      //   case 7:
      //     goals = await Goal.find({
      //       $and: [
      //         {
      //           createdAt: {
      //             $gte: new Date(`${date.getFullYear()}-04-31`),
      //           },
      //         },
      //         {
      //           createdAt: {
      //             $lte: new Date(`${date.getFullYear()}-08-01`),
      //           },
      //         },
      //       ],
      //     });
      //     break;
      //   case 8:
      //   case 9:
      //   case 10:
      //     goals = await Goal.find({
      //       $and: [
      //         {
      //           createdAt: {
      //             $gte: new Date(`${date.getFullYear()}-07-31`),
      //           },
      //         },
      //         {
      //           createdAt: {
      //             $lte: new Date(`${date.getFullYear()}-11-01`),
      //           },
      //         },
      //       ],
      //     });
      //     break;
      // }

      // res.json({ goals });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateGoal: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      // const { text, count } = req.body;
      // console.log(text, count);
      await Goal.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          // text,
          $set: {
            completeness: { $add: ["$completeness", req.body.count] },
          },
        }
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

const getSeason = (date: Date) => {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) {
    return "spring";
  } else if (month >= 6 && month <= 8) {
    return "summer";
  } else if (month >= 9 && month <= 11) {
    return "autumn";
  } else {
    return "winter";
  }
};

export default goalCtrl;
