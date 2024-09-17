import Recipe from "@/app/data/models/Recipe";
import {
  RecipeZype,
  RecipeIngredientZodel,
  RecipeStepZodel,
  RecipeZodel,
} from "../zodels/Recipe";
import createIngredient from "./createIngredients";
import createRecipeIngredient from "./createRecipeIngredient";
import createRecipeStep from "./createRecipeStep";
import RecipeStep from "@/app/data/models/RecipeStep";
import RecipeIngredient from "@/app/data/models/RecipeIngredient";
import Ingredient from "@/app/data/models/Ingredient";
import _ from "lodash";
import sequelize from "@/app/data/connection";

export default async function createRecipe(recipe: RecipeZype) {
  try {
    const result = await sequelize.transaction(async () => {
      await Recipe.sync().catch((err) => {
        console.log(err);
      });
      const res = await Recipe.findOrCreate({
        where: {
          name: recipe.name,
        },
        defaults: {
          name: recipe.name,
          length: recipe.length,
          difficulty: recipe.difficulty,
          mealdb_id: recipe.mealdb_id || undefined,
          image: recipe.image || undefined,
          video: recipe.video || undefined,
        },
        include: [{ model: RecipeStep }, { model: Ingredient }],
      }).catch((err) => {
        console.log(err);
      });
      const recipeResponse = res![0];
      const recipeResponseZodel = RecipeZodel.parse(recipeResponse);
      recipe.id = recipeResponse.dataValues.id;
      if (recipeResponse._options.isNewRecord) {
        console.log(`New recipe! ${recipeResponse.name}`);
      } else {
        if (!_.isEqual(recipe, recipeResponseZodel)) {
          recipeResponse.set({
            ..._.merge(recipeResponseZodel, recipe),
          });
          console.log(`Data diff detected in ${recipeResponse.name}`);
          recipeResponse.save();
        }
      }
      // Destroy all associated RecipeIngredients because it's easier than managing updates :/
      RecipeIngredient.destroy({
        where: {
          recipe_id: recipe.id,
        },
      });
      recipe.Ingredients.map(async (ingredient) => {
        const res = await createIngredient(ingredient);
        await createRecipeIngredient(
          RecipeIngredientZodel.parse({
            quantity: ingredient.RecipeIngredient.quantity,
            recipe_id: recipe.id,
            ingredient_id: res?.dataValues.id,
          }),
        );
      });
      // Destroy all associated RecipeSteps because it's easier than managing updates :/
      RecipeStep.destroy({
        where: {
          recipe_id: recipe.id,
        },
      });
      recipe.RecipeSteps.map(async (step) => {
        await createRecipeStep(
          RecipeStepZodel.parse({
            step: step.step,
            recipe_id: recipe.id,
            step_number: step.step_number,
          }),
        );
      });
    });
    return result;
  } catch (error) {
    console.log(`There was an error in createRecipe: ${error}`);
  }
}
