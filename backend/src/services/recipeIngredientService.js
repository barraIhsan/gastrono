import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import validate from "../validation/validate.js";
import {
  recipeIngredientSchema,
  updateRecipeIngredientSchema,
} from "../validation/recipeIngredientValidation.js";
import { getIngredientById } from "./ingredientService.js";
import { getRecipeById } from "./recipeService.js";

const recipeExists = async (req, rid) => {
  req.params.id = rid;
  await getRecipeById(req);
};

const ingredientExists = async (req, iid) => {
  req.params.id = iid;
  await getIngredientById(req);
};

export const getAllRecipeIngredient = async (req) => {
  await recipeExists(req, req.params.rid);

  const [rows] = await pool.query(
    `SELECT ri.id,ri.ingredient_id,ri.quantity,ri.unit
     FROM recipe_ingredients ri
     JOIN recipes r ON r.id = ri.recipe_id
     WHERE r.id=? AND r.user_id=?`,
    [req.params.rid, req.user.id],
  );

  return rows;
};

export const getRecipeIngredientById = async (req) => {
  await recipeExists(req, req.params.rid);
  await ingredientExists(req, req.params.iid);

  const [rows] = await pool.query(
    `SELECT ri.id,ri.quantity,ri.unit
     FROM recipe_ingredients ri
     JOIN recipes r ON r.id = ri.recipe_id
     WHERE r.id=? AND r.user_id=? AND ri.ingredient_id=?`,
    [req.params.rid, req.user.id, req.params.iid],
  );

  if (rows.length === 0) {
    throw new ResponseError(404, "No relation found");
  }

  return rows[0];
};

export const createRecipeIngredient = async (req) => {
  const validated = validate(recipeIngredientSchema, req.body);
  const { ingredient_id, quantity, unit } = validated;

  await recipeExists(req, req.params.rid);
  await ingredientExists(req, ingredient_id);

  const uuid = uuidv4();
  await pool.query(
    `INSERT INTO recipe_ingredients (id,recipe_id,ingredient_id,quantity,unit)
        VALUES (?,?,?,?,?)`,
    [uuid, req.params.rid, ingredient_id, quantity, unit],
  );

  return {
    uuid,
  };
};

export const updateRecipeIngredientById = async (req) => {
  const validated = validate(updateRecipeIngredientSchema, req.body);
  const { quantity, unit } = validated;

  await recipeExists(req, req.params.rid);
  await ingredientExists(req, req.params.iid);

  const [rows] = await pool.query(
    `UPDATE recipe_ingredients ri
     JOIN recipes r ON r.id = ri.recipe_id
     SET ri.quantity=?, ri.unit=?
     WHERE ri.ingredient_id=? AND r.user_id=?`,
    [quantity, unit, req.params.iid, req.user.id],
  );

  if (rows.affectedRows === 0) {
    throw new ResponseError(404, "No relation found");
  }
};

export const deleteRecipeIngredientById = async (req) => {
  const [rows] = await pool.query(
    `DELETE ri FROM recipe_ingredients ri
     JOIN recipes r ON r.id = ri.recipe_id
     WHERE ri.ingredient_id=? AND r.user_id=?`,
    [req.params.iid, req.user.id],
  );

  if (rows.affectedRows == 0) {
    throw new ResponseError(400, "No relation found");
  }
};
