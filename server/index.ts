import dotenv from "dotenv";
dotenv.config();
const express = require("express");
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes";

// Init Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Define Routes
// app.get("/", (req, res) => res.json({ msg: "API Running" }));
app.use("/api", routes);
// app.use("/api", routes.authRoute);

// Connect Database
import "./config/database";

// server listenning
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
