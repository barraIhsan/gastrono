import express from "express";
import {
  createIngredientHandler,
  deleteIngredientByIdHandler,
  getAllIngredientHandler,
  getIngredientByIdHandler,
  updateIngredientByIdHandler,
} from "../controllers/ingredientController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const ingredientRouter = express.Router();
ingredientRouter.get("/", authenticateToken, getAllIngredientHandler);
ingredientRouter.get("/:id", authenticateToken, getIngredientByIdHandler);
ingredientRouter.post("/", authenticateToken, createIngredientHandler);
ingredientRouter.put("/:id", authenticateToken, updateIngredientByIdHandler);
ingredientRouter.delete("/:id", authenticateToken, deleteIngredientByIdHandler);

export default ingredientRouter;
