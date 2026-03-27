import express from "express";
import rateLimit from "express-rate-limit";
import authCtrl from "../controllers/authCtrl";
import auth from "../middleware/auth";
import { validateRegister, validateLogin } from "../middleware/valid";

const router = express.Router();

// Strict rate limit for auth endpoints (brute-force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: "Too many attempts. Please try again in 15 minutes." },
  skipSuccessfulRequests: true, // only count failures
});

// Slightly more lenient limit for token refresh (called on every app load)
const refreshLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Registration & activation ─────────────────────────────────────────────────
// @route  POST /api/register
router.post("/register", authLimiter, validateRegister, authCtrl.register);

// @route  POST /api/active
router.post("/active", authLimiter, authCtrl.activeAccount);

// ── Email / phone login ───────────────────────────────────────────────────────
// @route  POST /api/login
router.post("/login", authLimiter, validateLogin, authCtrl.login);

// ── Session management ────────────────────────────────────────────────────────
// @route  GET /api/logout
router.get("/logout", auth, authCtrl.logout);

// @route  GET /api/refresh_token
router.get("/refresh_token", refreshLimiter, authCtrl.refreshToken);

// ── Google OAuth ──────────────────────────────────────────────────────────────
// @route  POST /api/google_login
router.post("/google_login", authLimiter, authCtrl.googleLogin);

// ── SMS OTP ───────────────────────────────────────────────────────────────────
// @route  POST /api/login_sms
router.post("/login_sms", authLimiter, authCtrl.loginSMS);

// @route  POST /api/sms_verify
router.post("/sms_verify", authLimiter, authCtrl.smsVerify);

export default router;