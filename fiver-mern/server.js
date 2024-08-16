import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import gigRouter from "./routes/gig.route.js";
import conversationRouter from "./routes/conversation.route.js";
import orderRouter from "./routes/order.route.js";
import messageRouter from "./routes/message.route.js";
import reviewRouter from "./routes/review.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:4000", credentials: true }));

app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", gigRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", conversationRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", messageRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const erroMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(erroMessage);
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};

const PORT = 5000;
app.listen(PORT, () => {
  connect();
  console.log(`Backend server running on PORT ${PORT}!`);
});
