import z from "zod";

export const ingredientSchema = z
  .object({
    name: z
      .string("Name must be a string")
      .min(3, "Name must contain more than 3 characters")
      .max(64, "Name must not contain more than 64 characters"),
  })
  .strict();
