import express from "express";
import {
  getConversations,
  getSingleConversation,
  updateConversations,
  createConversation,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/conversations").get(verifyToken, getConversations);
router.route("/conversations/single/:id").get(verifyToken, getSingleConversation);
router.route("/conversations").post(verifyToken, createConversation);
router.route("/conversations/:id").put(verifyToken, updateConversations);

export default router;
