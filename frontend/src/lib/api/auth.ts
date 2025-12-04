import z from "zod";
import api from "./axios";
import { loginSchema, registerSchema } from "../schema/auth";

export const login = async (data: z.infer<typeof loginSchema>) => {
  return await api.post("/auth/login", data);
};

export const register = async (data: z.infer<typeof registerSchema>) => {
  const { username, password } = data;
  return await api.post("/auth/register", { username, password });
};

export const refresh = async () => {
  return await api.post("/auth/refresh");
};
