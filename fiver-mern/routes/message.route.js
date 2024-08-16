import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getMessage,
  createMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.route("/messages/:id").get(verifyToken, getMessage);
router.route("/messages").post(verifyToken, createMessages);

export default router;
