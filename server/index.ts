import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// import routes from "./routes";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
import goalRoute from "./routes/goalRoute";
import planRoute from "./routes/planRoute";
import dayRoute from "./routes/dayRoute";
import categoryRoute from "./routes/categoryRoute";

import "./config/database";

// Init Middleware
const app = express();

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

// ── Global rate limit (per IP) ────────────────────────────────────────────────
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { msg: "Too many requests, please try again later" },
  })
);

// ── Body parsing & logging ────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());
// app.use(morgan("dev"));
// app.use(cookieParser());


// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", goalRoute);
app.use("/api", planRoute);
app.use("/api", dayRoute);
app.use("/api", categoryRoute);

// ── 404 fallback ──────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ msg: "Route not found" });
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app


// Define Routes
// app.get("/", (req, res) => res.json({ msg: "API Running" }));
// app.use("/api", routes);
// app.use("/api", routes.authRoute);

// server listenning
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
