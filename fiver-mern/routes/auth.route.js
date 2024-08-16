import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/auth/register").post(register);
router.route("/auth/login").post(login);
router.route("/auth/logout").post(logout);

export default router;
