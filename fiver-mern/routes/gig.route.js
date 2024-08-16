import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createGigs,
  deleteGigs,
  getGig,
  getGigs,
} from "../controllers/gig.controller.js";

const router = express.Router();

router.route("/gigs").get(getGigs);
router.route("/gigs/single/:id").get(getGig);
router.route("/gigs").post(verifyToken, createGigs);
router.route("/gigs/:id").delete(verifyToken, deleteGigs);

export default router;
