import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createReviews,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.route("/reviews").post(verifyToken, createReviews);
router.route("/reviews/:gigId").get(getReviews);
router.route("/reviews/:id").delete(deleteReview);

export default router;
