import * as IngredientService from "../services/ingredientService.js";

export const getAllIngredientHandler = async (req, res, next) => {
  try {
    const response = await IngredientService.getAllIngredient(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const getIngredientByIdHandler = async (req, res, next) => {
  try {
    const response = await IngredientService.getIngredientById(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const createIngredientHandler = async (req, res, next) => {
  try {
    const response = await IngredientService.createIngredient(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const updateIngredientByIdHandler = async (req, res, next) => {
  try {
    await IngredientService.updateIngredientById(req);

    res.status(200).json({
      status: "success",
      message: "Ingredient successfully updated",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteIngredientByIdHandler = async (req, res, next) => {
  try {
    await IngredientService.deleteIngredientById(req);

    res.status(200).json({
      status: "success",
      message: "Ingredient successfully deleted",
    });
  } catch (err) {
    next(err);
  }
};
