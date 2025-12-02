import express from "express";
import {
  createUserHandler,
  deleteUserByIdHandler,
  getAllUserHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const userRouter = express.Router();
userRouter.get("/", authenticateToken, getAllUserHandler);
userRouter.get("/:id", authenticateToken, getUserByIdHandler);
userRouter.post("/", createUserHandler);
userRouter.put("/:id", authenticateToken, updateUserByIdHandler);
userRouter.delete("/:id", authenticateToken, deleteUserByIdHandler);

export default userRouter;
