import express from "express";
import rateLimit from "express-rate-limit";
import {
  getUserProfile,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});

// 1. For signup a user
router.route("/register").post(register);

// 2. For login a user
router.route("/login").post(loginLimiter, login);

// 3. For logout to get a user
router.route("/logout").get(logout);

router.route("/profile").get(isAuthenticated, getUserProfile);

export default router;

