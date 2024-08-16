import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";

const router = express.Router();

// router.route("/orders/:gigId").post(verifyToken, createOrder);
router.route("/orders/create-payment-intent/:gigId").post(verifyToken, intent);
router.route("/orders").get(verifyToken, getOrders);
router.route("/orders").put(verifyToken, confirm);

export default router;
