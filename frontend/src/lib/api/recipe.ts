import z from "zod";
import api from "./axios";
import { recipeApiSchema } from "../schema/recipe";

export const createRecipe = async (data: z.infer<typeof recipeApiSchema>) =>
  (await api.post("/recipes", data)).data;

export const getAllRecipes = async () => (await api.get("/recipes")).data;
