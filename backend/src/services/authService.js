import { ResponseError } from "../errors/responseError.js";
import { userSchema } from "../validation/userValidation.js";
import validate from "../validation/validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByUsername } from "./userService.js";

export const register = async (req) => {
  await createUser(req);
};

export const login = async (req, res) => {
  const { username, password } = validate(userSchema, req.body);

  const user = await getUserByUsername(username);
  const targetHash = user ? user.password : process.env.DUMMY_HASH;
  const passwordMatch = await bcrypt.compare(password, targetHash);

  if (!user || !passwordMatch) {
    throw new ResponseError(401, "Username or password is incorrect");
  }

  // generate token
  const payload = { sub: user.id, username: user.username, role: user.role };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  // set cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return {
    id: user.id,
    accessToken,
  };
};

export const refresh = async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    throw new ResponseError(401, "Refresh token is missing");
  }

  jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
    if (err) {
      throw new ResponseError(403, "Invalid or expired refresh token");
    }

    // generate new token
    const payload = {
      sub: decoded.sub,
      username: decoded.username,
      role: decoded.role,
    };

    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const newRefreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // set cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken: newAccessToken });
  });
};
