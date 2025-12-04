import express from "express";
import {
  loginHandler,
  refreshHandler,
  registerHandler,
} from "../controllers/authController.js";

const authRouter = express.Router();
authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);
authRouter.post("/refresh", refreshHandler);

export default authRouter;
