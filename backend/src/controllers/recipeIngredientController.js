import * as RecipeIngredientService from "../services/recipeIngredientService.js";

export const getAllRecipeIngredientHandler = async (req, res, next) => {
  try {
    const response = await RecipeIngredientService.getAllRecipeIngredient(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const getRecipeIngredientByIdHandler = async (req, res, next) => {
  try {
    const response = await RecipeIngredientService.getRecipeIngredientById(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const createRecipeIngredientHandler = async (req, res, next) => {
  try {
    const response = await RecipeIngredientService.createRecipeIngredient(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const updateRecipeIngredientByIdHandler = async (req, res, next) => {
  try {
    await RecipeIngredientService.updateRecipeIngredientById(req);

    res.status(200).json({
      status: "success",
      message: "Relation successfully updated",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteRecipeIngredientByIdHandler = async (req, res, next) => {
  try {
    await RecipeIngredientService.deleteRecipeIngredientById(req);

    res.status(200).json({
      status: "success",
      message: "Relation successfully deleted",
    });
  } catch (err) {
    next(err);
  }
};
