import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

import Users from "../models/userModel";
import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";
import sendEmail from "../config/sendMail";
import { validateEmail, validatePhone } from "../middleware/valid";
import { sendSMS, smsOTP, smsVerify } from "../config/sendSMS";
import {
  IDecodedToken,
  IUser,
  IGgPayload,
  IUserParams,
  IReqAuth,
} from "../config/interface";

const googleClient = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
const CLIENT_URL = `${process.env.BASE_URL}`;

// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derive a deterministic password for OAuth users.
 * Uses HMAC-SHA256 with a server-side secret so the "password" is never
 * derivable from the source code alone — unlike the previous hardcoded strings.
 */
const deriveOAuthPassword = (identifier: string, provider: string): string => {
  const secret = process.env.OAUTH_PASSWORD_SECRET;
  if (!secret) throw new Error("OAUTH_PASSWORD_SECRET is not set");
  return crypto
    .createHmac("sha256", secret)
    .update(`${provider}:${identifier}`)
    .digest("hex");
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const msg =
      user.type === "register"
        ? "Password is incorrect"
        : `This account was registered with ${user.type}. Please use that sign-in method.`;
    return res.status(400).json({ msg });
  }

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);

  await Users.findByIdAndUpdate(user._id, { rf_token: refresh_token });

  return res.json({
    msg: "Login success",
    access_token,
    user: { ...user._doc, password: "" },
  });
};

const registerUser = async (user: IUserParams, res: Response) => {
  const newUser = new Users(user);

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id }, res);

  newUser.rf_token = refresh_token;
  await newUser.save();

  return res.json({
    msg: "Register success",
    access_token,
    user: { ...newUser._doc, password: "" },
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Controller
// ─────────────────────────────────────────────────────────────────────────────

const authCtrl = {
  /**
   * Step 1 of email/phone registration.
   * Sends a verification link — the account is not created yet.
   */
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;

      const existing = await Users.findOne({ account });
      if (existing)
        return res
          .status(409)
          .json({ msg: "Email or phone number already registered" });

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = { name, account, password: passwordHash };
      const active_token = generateActiveToken({ newUser });
      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateEmail(account)) {
        await sendEmail(account, url, "Verify your email address");
        return res.json({
          msg: "Account created. Please check your email to activate it.",
        });
      }

      if (validatePhone(account)) {
        sendSMS(account, url, "Verify your phone number");
        return res.json({
          msg: "Account created. Please check your phone to activate it.",
        });
      }

      return res.status(400).json({ msg: "Invalid email or phone format" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /**
   * Step 2 — user clicks the activation link.
   * Verifies the token and persists the account.
   */
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;

      let decoded: IDecodedToken;
      try {
        decoded = jwt.verify(
          active_token,
          `${process.env.ACTIVE_TOKEN_SECRET}`
        ) as IDecodedToken;
      } catch {
        return res
          .status(400)
          .json({ msg: "Activation link is invalid or has expired" });
      }

      const { newUser } = decoded;
      if (!newUser)
        return res.status(400).json({ msg: "Invalid activation token" });

      const existing = await Users.findOne({ account: newUser.account });
      if (existing)
        return res
          .status(409)
          .json({ msg: "Account is already active. Please sign in." });

      const user = new Users(newUser);
      await user.save();

      return res.json({ msg: "Account activated. You can now sign in." });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await Users.findOne({ account });
      if (!user)
        // Generic message to avoid account enumeration
        return res.status(400).json({ msg: "Invalid credentials" });

      return loginUser(user, password, res);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(401).json({ msg: "Invalid authentication" });

    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      await Users.findByIdAndUpdate(req.user._id, { rf_token: "" });
      return res.json({ msg: "Logged out" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /**
   * Issues a new access token using the httpOnly refresh token cookie.
   * Also rotates the refresh token on every call (refresh token rotation).
   */
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(401).json({ msg: "Please sign in again" });

      let decoded: IDecodedToken;
      try {
        decoded = jwt.verify(
          rf_token,
          `${process.env.REFRESH_TOKEN_SECRET}`
        ) as IDecodedToken;
      } catch {
        return res
          .status(401)
          .json({ msg: "Session expired. Please sign in again." });
      }

      if (!decoded.id)
        return res.status(401).json({ msg: "Please sign in again" });

      const user = await Users.findById(decoded.id).select("-password +rf_token");
      if (!user)
        return res.status(401).json({ msg: "Account no longer exists" });

      // Detect refresh token reuse (sign of token theft)
      if (rf_token !== user.rf_token) {
        // Invalidate all sessions for this user
        await Users.findByIdAndUpdate(user._id, { rf_token: "" });
        res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
        return res
          .status(401)
          .json({ msg: "Security alert: please sign in again" });
      }

      // Rotate: issue new access + refresh tokens
      const access_token = generateAccessToken({ id: user._id });
      const new_refresh_token = generateRefreshToken({ id: user._id }, res);

      await Users.findByIdAndUpdate(user._id, {
        rf_token: new_refresh_token,
      });

      return res.json({
        access_token,
        user: { ...user._doc, password: "", rf_token: undefined },
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  googleLogin: async (req: Request, res: Response) => {
    try {
      const { id_token } = req.body;
      if (!id_token)
        return res.status(400).json({ msg: "Missing Google token" });

      const ticket = await googleClient.verifyIdToken({
        idToken: id_token,
        audience: `${process.env.MAIL_CLIENT_ID}`,
      });

      const payload = ticket.getPayload() as IGgPayload;
      if (!payload?.email_verified)
        return res.status(400).json({ msg: "Google email is not verified" });

      const { email, name, picture } = payload;
      const password = deriveOAuthPassword(email, "google");
      const passwordHash = await bcrypt.hash(password, 12);

      const existing = await Users.findOne({ account: email });

      if (existing) {
        return loginUser(existing, password, res);
      } else {
        return registerUser(
          { name, account: email, password: passwordHash, image: picture, type: "google" },
          res
        );
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  loginSMS: async (req: Request, res: Response) => {
    try {
      const { phone } = req.body;
      if (!phone || !validatePhone(phone))
        return res.status(400).json({ msg: "Invalid phone number format" });

      const data = await smsOTP(phone, "sms");
      if (!data) return res.status(500).json({ msg: "Failed to send SMS" });

      return res.json({ msg: "Code sent to your phone" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  smsVerify: async (req: Request, res: Response) => {
    try {
      const { phone, code } = req.body;
      if (!phone || !code)
        return res.status(400).json({ msg: "Phone and code are required" });

      const data = await smsVerify(phone, code);
      if (!data?.valid)
        return res.status(400).json({ msg: "Invalid or expired code" });

      const password = deriveOAuthPassword(phone, "sms");
      const passwordHash = await bcrypt.hash(password, 12);
      const existing = await Users.findOne({ account: phone });

      if (existing) {
        return loginUser(existing, password, res);
      } else {
        return registerUser(
          { name: phone, account: phone, password: passwordHash, type: "sms" },
          res
        );
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default authCtrl;