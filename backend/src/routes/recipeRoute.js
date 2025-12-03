import express from "express";
import {
  createRecipeHandler,
  deleteRecipeByIdHandler,
  getAllRecipeHandler,
  getRecipeByIdHandler,
  updateRecipeByIdHandler,
} from "../controllers/recipeController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  createRecipeIngredientHandler,
  deleteRecipeIngredientByIdHandler,
  getAllRecipeIngredientHandler,
  getRecipeIngredientByIdHandler,
  updateRecipeIngredientByIdHandler,
} from "../controllers/recipeIngredientController.js";

const recipeRouter = express.Router();
recipeRouter.get("/", authenticateToken, getAllRecipeHandler);
recipeRouter.get("/:id", authenticateToken, getRecipeByIdHandler);
recipeRouter.post("/", authenticateToken, createRecipeHandler);
recipeRouter.put("/:id", authenticateToken, updateRecipeByIdHandler);
recipeRouter.delete("/:id", authenticateToken, deleteRecipeByIdHandler);

// recipe-ingredients
// prettier-ignore
{
  recipeRouter.get("/:rid/ingredients", authenticateToken, getAllRecipeIngredientHandler);
  recipeRouter.get("/:rid/ingredients/:iid", authenticateToken, getRecipeIngredientByIdHandler);
  recipeRouter.post("/:rid/ingredients", authenticateToken, createRecipeIngredientHandler);
  recipeRouter.put("/:rid/ingredients/:iid", authenticateToken, updateRecipeIngredientByIdHandler);
  recipeRouter.delete("/:rid/ingredients/:iid", authenticateToken, deleteRecipeIngredientByIdHandler);
}

export default recipeRouter;
