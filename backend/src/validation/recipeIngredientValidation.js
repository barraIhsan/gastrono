import z from "zod";

export const recipeIngredientSchema = z
  .object({
    ingredient_id: z.uuidv4("Ingredient ID must be valid"),
    quantity: z
      .string("Quantity must be a string")
      .max(32, "Quantity must not contain more than 32 characters"),
    unit: z
      .string("Unit must be a string")
      .max(32, "Unit must not contain more than 32 characters")
      .optional(),
  })
  .strict();

export const updateRecipeIngredientSchema = recipeIngredientSchema.omit({
  ingredient_id: true,
});
