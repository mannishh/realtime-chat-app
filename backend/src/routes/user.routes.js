import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getMe,
  getUserCount,
  getUserStatus,
  getUserById
} from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(getAllUsers);
router.route("/getMe").get(verifyJwt, getMe);
router.route("/count").get(verifyJwt, getUserCount);
router.route('/getStatus').get(verifyJwt,getUserStatus)
router.route('/:id').get(verifyJwt, getUserById)

export default router;
