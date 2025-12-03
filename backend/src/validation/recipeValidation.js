import z from "zod";

export const recipeSchema = z
  .object({
    title: z
      .string("Title must be a string")
      .min(3, "Title must contain more than 3 characters")
      .max(64, "Title must not contain more than 64 characters"),
    description: z.string("Description must not be empty"),
    image_url: z.string("Image must be set"),
  })
  .strict();
