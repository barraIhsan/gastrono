import z from "zod";

export const recipeSchema = z.object({
  slug: z
    .string("Slug must be a string")
    .regex(/^\S+$/, "Slug must not contain any space")
    .min(3, "Slug must contain more than 3 characters")
    .max(32, "Slug must not contain more than 32 characters"),
  title: z
    .string("Title must be a string")
    .min(3, "Title must contain more than 6 characters")
    .max(64, "Title must not contain more than 64 characters"),
  description: z.string("Description must not be empty"),
  image_url: z.string("Image must be set"),
});

export const updateRecipeSchema = recipeSchema.partial();
