import * as RecipeService from "../services/recipeService.js";

export const getAllRecipeHandler = async (req, res, next) => {
  try {
    const response = await RecipeService.getAllRecipe(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const getRecipeByIdHandler = async (req, res, next) => {
  try {
    const response = await RecipeService.getRecipeById(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const createRecipeHandler = async (req, res, next) => {
  try {
    const response = await RecipeService.createRecipe(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const updateRecipeByIdHandler = async (req, res, next) => {
  try {
    const response = await RecipeService.updateRecipeById(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteRecipeByIdHandler = async (req, res, next) => {
  try {
    await RecipeService.deleteRecipeById(req);

    res.status(200).json({
      status: "success",
      message: "Recipe successfully deleted",
    });
  } catch (err) {
    next(err);
  }
};
