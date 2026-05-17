import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMe } from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(verifyJwt, getAllUsers);
router.route("/getMe").get(verifyJwt, getMe);

export default router;
