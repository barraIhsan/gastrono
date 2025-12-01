import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { userSchema } from "../validation/authValidation.js";
import validate from "../validation/validate.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const getUser = async (username) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE username = ? LIMIT 1",
    [username],
  );
  return rows[0] || null;
};

export const register = async (req) => {
  const validated = validate(userSchema, req);
  const { username, password } = validated;

  const usernameExists = await getUser(username);
  if (usernameExists) {
    throw new ResponseError(401, "Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (id, username, password) VALUES (?,?,?)",
    [uuidv4(), username, hashedPassword],
  );
};

export const login = async (req) => {
  const { username, password } = validate(userSchema, req);

  const user = await getUser(username);
  if (!user) {
    throw new ResponseError(401, "Username or password is incorrect");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ResponseError(401, "Username or password is incorrect");
  }

  const payload = { id: user.id, username: user.username };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });

  return {
    token,
  };
};

export const refresh = async (req, _res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    throw new ResponseError(401, "Refresh token is missing");
  }

  // TODO: implement refresh jwt token
};
