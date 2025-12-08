import z from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const recipeSchema = z
  .object({
    title: z
      .string("Recipe Name must be a string")
      .min(3, "Recipe Name must contain more than 3 characters")
      .max(64, "Recipe Name must not contain more than 64 characters"),
    description: z
      .any()
      .refine(
        (content) => JSON.stringify(content).length >= 48,
        "Recipe Instructions must not be empty",
      ),
    hours: z.preprocess(Number, z.number("Hours must be a number").min(0)),
    minutes: z.preprocess(
      Number,
      z
        .number("Minutes must be a number")
        .min(0)
        .max(59, "Minutes must be less than 60"),
    ),
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
  })
  .refine((data) => data.hours > 0 || data.minutes > 0, {
    message: "Enter at least 1 minute of duration",
    path: ["minutes"],
  });

export const updateRecipeSchema = recipeSchema.partial({ image: true });

export const recipeApiSchema = recipeSchema
  .omit({ image: true, hours: true, minutes: true })
  .extend({
    image_url: z.string(),
    total_minutes: z.number(),
  });
