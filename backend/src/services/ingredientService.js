import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { ingredientSchema } from "../validation/ingredientValidation.js";
import validate from "../validation/validate.js";

export const getAllIngredient = async (req) => {
  const [rows] = await pool.query(
    "SELECT id,name FROM ingredients WHERE user_id=?",
    [req.user.id],
  );

  return rows;
};

export const getIngredientById = async (req) => {
  const [rows] = await pool.query(
    "SELECT * FROM ingredients WHERE id = ? AND user_id=?",
    [req.params.id, req.user.id],
  );

  if (rows.length === 0) {
    throw new ResponseError(404, "Ingredient not found");
  }

  return rows[0];
};

export const createIngredient = async (req) => {
  const validated = validate(ingredientSchema, req.body);
  const { name } = validated;

  const uuid = uuidv4();
  await pool.query(
    `INSERT INTO ingredients (id,name,user_id)
        VALUES (?,?,?)`,
    [uuid, name, req.user.id],
  );

  return {
    uuid,
  };
};

export const updateIngredientById = async (req) => {
  const validated = validate(ingredientSchema, req.body);
  const { name } = validated;

  const [rows] = await pool.query(
    "UPDATE ingredients SET name=? WHERE id=? AND user_id=?",
    [name, req.params.id, req.user.id],
  );

  if (rows.affectedRows === 0) {
    throw new ResponseError(404, "Ingredient not found");
  }
};

export const deleteIngredientById = async (req) => {
  const [rows] = await pool.query(
    "DELETE FROM ingredients WHERE id=? AND user_id=?",
    [req.params.id, req.user.id],
  );

  if (rows.affectedRows == 0) {
    throw new ResponseError(404, "Ingredient not found");
  }
};
