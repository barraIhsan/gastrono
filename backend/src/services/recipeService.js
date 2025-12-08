import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { recipeSchema } from "../validation/recipeValidation.js";
import validate from "../validation/validate.js";

export const getAllRecipe = async (req) => {
  const [rows] = await pool.query(
    "SELECT id,title,total_minutes,image_url,created_at FROM recipes WHERE user_id=? ORDER BY created_at DESC",
    [req.user.id],
  );

  return rows;
};

export const getRecipeById = async (req) => {
  const [rows] = await pool.query(
    "SELECT id,title,description,total_minutes,image_url,created_at FROM recipes WHERE id = ? AND user_id=?",
    [req.params.id, req.user.id],
  );

  if (rows.length === 0) {
    throw new ResponseError(404, "Recipe not found");
  }

  return rows[0];
};

export const createRecipe = async (req) => {
  const validated = validate(recipeSchema, req.body);
  const { title, description, total_minutes, image_url } = validated;

  const uuid = uuidv4();
  await pool.query(
    `INSERT INTO recipes (id,title,description,total_minutes,image_url,user_id)
        VALUES (?,?,?,?,?,?)`,
    [uuid, title, description, total_minutes, image_url, req.user.id],
  );

  return {
    uuid,
  };
};

export const updateRecipeById = async (req) => {
  const validated = validate(recipeSchema, req.body);
  const { title, description, total_minutes, image_url } = validated;

  const [rows] = await pool.query(
    "UPDATE recipes SET title=?, description=?, total_minutes=?, image_url=? WHERE id=? AND user_id=?",
    [title, description, total_minutes, image_url, req.params.id, req.user.id],
  );

  if (rows.affectedRows === 0) {
    throw new ResponseError(404, "Recipe not found");
  }
};

export const deleteRecipeById = async (req) => {
  const [rows] = await pool.query(
    "DELETE FROM recipes WHERE id=? AND user_id=?",
    [req.params.id, req.user.id],
  );

  if (rows.affectedRows == 0) {
    throw new ResponseError(404, "Recipe not found");
  }
};
