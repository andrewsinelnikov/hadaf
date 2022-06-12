import { Request, Response } from "express";
import Category from "../models/categoryModel";
import { IReqAuth } from "../config/interface";

const categoryCtrl = {
  createCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const name = req.body.name.toLowerCase();

      const newCategory = new Category({ name });
      await newCategory.save();

      res.json({ newCategory });
    } catch (err: any) {
      let errMsg;
      if (err.code === 11000) {
        errMsg = Object.keys(err.keyValue)[0] + " already exists";
      } else {
        let name = Object.keys(err.keyValue)[0];
        errMsg = err.errors[`${name}`].message;
      }
      return res.status(500).json({ msg: errMsg });
    }
  },
};
