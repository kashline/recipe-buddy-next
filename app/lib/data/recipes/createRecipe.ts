import Recipe from "@/app/data/models/Recipe";
import {
  RecipeZype,
  RecipeIngredientZodel,
  RecipeStepZodel,
} from "../zodels/Recipe";
import createIngredient from "./createIngredients";
import createRecipeIngredient from "./createRecipeIngredient";
import createRecipeStep from "./createRecipeStep";
import RecipeStep from "@/app/data/models/RecipeStep";
import RecipeIngredient from "@/app/data/models/RecipeIngredient";
import Ingredient from "@/app/data/models/Ingredient";
import _ from "lodash";
import sequelize from "@/app/data/connection";
import { Transaction } from "sequelize";
import { auth } from "@/auth";

type RecipeWith_options = Recipe & {
  _options?: any;
};

/**
 *
 * @param recipe RecipeZype
 * @returns Promise<any>
 */
export default async function createRecipe(recipe: RecipeZype) {
  const session = await auth();
  if (!session) {
    Promise.reject(`No valid user session`);
  }
  try {
    const result = await sequelize.transaction(async (t: Transaction) => {
      const res: [RecipeWith_options, boolean] = await Recipe.findOrCreate({
        where: { id: recipe.id },
        defaults: {
          title: recipe.title,
          description: recipe.description,
          preparationTime: recipe.preparationTime,
          cookingTime: recipe.cookingTime,
          difficulty: recipe.difficulty,
          image: recipe.image || undefined,
          video: recipe.video || undefined,
          tags: recipe.tags || undefined,
          servings: recipe.servings,
          owner: recipe.owner,
          aigenerated: recipe.aigenerated,
        },
        include: [{ model: Ingredient }, { model: RecipeStep }],
        transaction: t,
      });
      // Make sure the user initiating the request is allowed to edit this recipe
      if (res[0].dataValues.owner !== session?.user?.email) {
        return `You can't edit recipes you don't own!`;
      } else {
        // Only run this block on new recipes
        if (res[0]._options.isNewRecord) {
          const recipeId = res[0].dataValues.id;
          // Validate every ingredient exists before setting up RecipeIngredient association
          recipe.Ingredients!.map(async (ingredient) => {
            const res = await createIngredient(ingredient);
            await createRecipeIngredient(
              RecipeIngredientZodel.parse({
                quantity: ingredient.RecipeIngredient.quantity,
                recipe_id: recipeId,
                ingredient_id: res?.dataValues.id,
              }),
            );
          });
          // Create RecipeStep associations
          recipe.RecipeSteps!.map(async (step) => {
            await createRecipeStep(
              RecipeStepZodel.parse({
                description: step.description,
                recipe_id: recipeId,
                step_number: step.step_number,
                ingredients: step.ingredients || undefined,
              }),
            );
          });
        } else {
          res[0].set({ ...recipe });
          await res[0].save({ transaction: t });
          // Handle RecipeIngredient updates by deleting them all and recreating them from payload data
          const recipeIngredientData = await RecipeIngredient.findAll({
            where: { recipe_id: recipe.id },
          });
          recipeIngredientData.map((ri: any) => {
            ri.destroy();
          });
          res[0].dataValues.Ingredients.map(
            async (ingredient: Ingredient, index: number) => {
              const ingredientId = (
                await Ingredient.findOrCreate({
                  where: { name: ingredient.dataValues.name },
                  defaults: { name: ingredient.dataValues.name, tags: [] },
                })
              )[0].dataValues.id;
              await RecipeIngredient.create({
                quantity:
                  ingredient.dataValues.RecipeIngredient.dataValues.quantity,
                ingredient_id: ingredientId,
                recipe_id: recipe.id,
                transaction: t,
              });
            },
          );
          // Handle RecipeSteps updates by deleting them all and recreating them from payload data
          const currentSteps = await RecipeStep.findAll({
            where: { recipe_id: res[0].dataValues.id },
          });
          currentSteps.map(async (step) => {
            await RecipeStep.destroy({ where: { id: step.dataValues.id } });
          });
          res[0].dataValues.RecipeSteps.map(async (step: RecipeStep) => {
            await RecipeStep.create({
              description: step.dataValues.description,
              step_number: step.dataValues.step_number,
              ingredients: [],
              recipe_id: res[0].dataValues.id,
              transaction: t,
            });
          });
        }
      }
      return res;
    });
    return Promise.resolve(result);
  } catch (error) {
    console.log(`There was an error in createRecipe: ${error}`);
    return Promise.reject(error);
  }
}
