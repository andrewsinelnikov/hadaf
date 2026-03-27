import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  name: string;
  account: string;
  password: string;
  image: string;
  usta: string;
  bbook: string;
  role: "user" | "admin";
  type: "register" | "google" | "sms";
  rf_token?: string;
  _doc: object;
}

export interface INewUser {
  name: string;
  account: string;
  password: string;
}

export interface IDecodedToken {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}

export interface IGgPayload {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
}

export interface IUserParams {
  name: string;
  account: string;
  password: string;
  image?: string;
  type: "register" | "google" | "sms";
}

export interface IReqAuth extends Request {
  user?: IUser;
}

export interface IGoal extends Document {
  user: string;
  text: string;
  completeness: number;
  isDone: boolean;
  _doc: object;
}

export interface IPlan extends Document {
  goal: string;
  text: string;
  count: number;
  completeness: number;
  _doc: object;
}

export interface IDay extends Document {
  user: string;
  date: string;
  plans: Array<{ plan_id: string; done: boolean }>;
  _doc: object;
}