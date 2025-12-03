import z from "zod";

export const loginSchema = z.object({
  username: z
    .string("Username must be a string")
    .min(3, "Username must contain more than 3 characters")
    .max(32, "Username must not contain more than 32 characters")
    .regex(/^\S+$/, "Username must not contain spaces"),
  password: z
    .string("Password must be a string")
    .min(6, "Password must contain more than 6 characters")
    .max(64, "Password must not contain more than 64 characters"),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z
      .string("Password must be a string")
      .min(6, "Password must contain more than 6 characters")
      .max(64, "Password must not contain more than 64 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passswords don't match",
    path: ["confirmPassword"],
  });
