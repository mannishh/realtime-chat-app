import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(verifyJwt, getAllUsers);

export default router;
