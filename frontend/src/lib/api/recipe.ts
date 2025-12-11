import z from "zod";
import api from "./axios";
import { recipeApiSchema } from "../schema/recipe";

export const createRecipe = async (data: z.infer<typeof recipeApiSchema>) =>
  (await api.post("/recipes", data)).data;

export const updateRecipe = async (
  id: string,
  data: z.infer<typeof recipeApiSchema>,
) => (await api.put("/recipes/" + id, data)).data;

export const getAllRecipes = async (q?: string) =>
  (await api.get("/recipes", { params: q ? { q } : {} })).data;

export const getRecipe = async (id: string) =>
  (await api.get("/recipes/" + id)).data;

export const deleteRecipe = async (id: string) =>
  (await api.delete("/recipes/" + id)).data;
