import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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

// routes declaration
app.use("/api/auth", authRoutes);


export default app;
