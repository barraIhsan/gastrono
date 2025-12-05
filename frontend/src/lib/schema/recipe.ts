import z from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const recipeSchema = z.object({
  title: z
    .string("Recipe Name must be a string")
    .min(3, "Recipe Name must contain more than 3 characters")
    .max(64, "Recipe Name must not contain more than 64 characters"),
  description: z
    .string("Recipe Instructions must be a string")
    .min(48, "Recipe Instructions must not be empty"),
  image: z
    .any()
    .refine((files) => files instanceof FileList, "Recipe Image is required")
    .refine(
      (files) => files?.[0].size <= MAX_FILE_SIZE,
      "Max file size is 100MB",
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0].type),
      "Only .jpg, .jpeg, .png and .webp files are accepted",
    ),
});

export const updateRecipeSchema = recipeSchema.partial({ image: true });

export const recipeApiSchema = recipeSchema.omit({ image: true }).extend({
  image_url: z.string(),
});
