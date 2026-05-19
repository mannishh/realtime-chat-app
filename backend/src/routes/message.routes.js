import express from "express";
import { getMessages } from "../controllers/message.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET /api/message/:receiverId  — fetch chat history with a user
router.get("/:id", verifyJwt, getMessages);

export default router;
