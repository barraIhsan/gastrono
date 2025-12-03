import { ResponseError } from "../errors/responseError.js";
import { userSchema } from "../validation/userValidation.js";
import validate from "../validation/validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByUsername } from "./userService.js";

export const register = async (req) => {
  await createUser(req);
};

export const login = async (req) => {
  const { username, password } = validate(userSchema, req.body);

  const user = await getUserByUsername(username);
  if (!user) {
    throw new ResponseError(401, "Username or password is incorrect");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ResponseError(401, "Username or password is incorrect");
  }

  const payload = { id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

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
