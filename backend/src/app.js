import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(" Backend API is running");
});

//routes import
import authRoutes from "./routes/auth.routes.js";
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js'

// routes declaration
app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes )
app.use("/api/message", messageRoutes);

export default app;
