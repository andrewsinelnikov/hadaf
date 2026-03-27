import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/userModel";
import { IDecodedToken, IReqAuth } from "../config/interface";

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ msg: "Invalid authentication" });

    const token = authHeader.slice(7); // strip "Bearer "

    let decoded: IDecodedToken;
    try {
      decoded = jwt.verify(
        token,
        `${process.env.ACCESS_TOKEN_SECRET}`
      ) as IDecodedToken;
    } catch {
      return res
        .status(401)
        .json({ msg: "Session expired. Please sign in again." });
    }

    if (!decoded?.id)
      return res.status(401).json({ msg: "Invalid authentication" });

    const user = await Users.findById(decoded.id).select("-password");
    if (!user)
      return res.status(401).json({ msg: "Account no longer exists" });

    req.user = user;
    next();
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default auth;