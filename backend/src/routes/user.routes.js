import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getMe,
  getUserCount,
  getUserStatus
} from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(getAllUsers);
router.route("/getMe").get(verifyJwt, getMe);
router.route("/count").get(getUserCount);
router.route('/getStatus').get(getUserStatus)

export default router;
