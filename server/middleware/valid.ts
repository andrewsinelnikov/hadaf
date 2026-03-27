import { Request, Response, NextFunction } from "express";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, account, password } = req.body;
  const errors: string[] = [];

  if (!name || typeof name !== "string") {
    errors.push("Name is required");
  } else if (name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  } else if (name.trim().length > 25) {
    errors.push("Name must be 25 characters or fewer");
  }

  if (!account || typeof account !== "string") {
    errors.push("Email or phone is required");
  } else if (!validateEmail(account) && !validatePhone(account)) {
    errors.push("Please provide a valid email address or phone number (+country code)");
  }

  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  } else if (password.length > 128) {
    errors.push("Password must be 128 characters or fewer");
  }

  if (errors.length > 0) return res.status(400).json({ msg: errors });

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { account, password } = req.body;
  const errors: string[] = [];

  if (!account) errors.push("Email or phone is required");
  if (!password) errors.push("Password is required");

  if (errors.length > 0) return res.status(400).json({ msg: errors });

  next();
};

export const validateEmail = (email: string): boolean => {
  const re =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone: string): boolean => {
  // E.164 format: + followed by 7–15 digits
  const re = /^\+[1-9]\d{6,14}$/;
  return re.test(phone);
};