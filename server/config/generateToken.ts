import jwt from "jsonwebtoken";
import { Response } from "express";

const {
  ACTIVE_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  NODE_ENV,
} = process.env;

/** Short-lived token embedded in the activation email/SMS link (5 min) */
export const generateActiveToken = (payload: object): string => {
  return jwt.sign(payload, `${ACTIVE_TOKEN_SECRET}`, { expiresIn: "5m" });
};

/** Access token sent in response body — short-lived (15 min) */
export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, `${ACCESS_TOKEN_SECRET}`, { expiresIn: "15m" });
};

/**
 * Refresh token stored as an httpOnly cookie.
 * - httpOnly: not accessible via JS
 * - secure: HTTPS only in production
 * - sameSite: "strict" prevents CSRF
 */
export const generateRefreshToken = (
  payload: object,
  res: Response
): string => {
  const refresh_token = jwt.sign(payload, `${REFRESH_TOKEN_SECRET}`, {
    expiresIn: "30d",
  });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "strict" : "lax",
    path: "/api/refresh_token",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return refresh_token;
};