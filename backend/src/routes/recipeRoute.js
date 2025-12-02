import express from "express";
import {
  createRecipeHandler,
  deleteRecipeByIdHandler,
  getAllRecipeHandler,
  getRecipeByIdHandler,
  updateRecipeByIdHandler,
} from "../controllers/recipeController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const recipeRouter = express.Router();
recipeRouter.get("/", authenticateToken, getAllRecipeHandler);
recipeRouter.get("/:id", authenticateToken, getRecipeByIdHandler);
recipeRouter.post("/", authenticateToken, createRecipeHandler);
recipeRouter.put("/:id", authenticateToken, updateRecipeByIdHandler);
recipeRouter.delete("/:id", authenticateToken, deleteRecipeByIdHandler);

export default recipeRouter;
