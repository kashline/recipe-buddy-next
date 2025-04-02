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
import { Op } from "sequelize";
import { auth } from "@/auth";

type RecipeWith_options = Recipe & {
  _options?: any;
};

export default async function createRecipe(recipe: RecipeZype) {
  const session = await auth();
  if (!session) {
    Promise.reject(`No valid user session`);
  }
  try {
    await Recipe.sync().catch((err) => {
      console.log(err);
    });
    const result = await sequelize.transaction(async () => {
      console.log(recipe.id)
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
      });
      console.log(res)
      if (res[0].dataValues.owner !== session?.user?.email) {
        return `You can't edit recipes you don't own!`;
      } else {
        if (res[0]._options.isNewRecord) {
          const recipeId = res[0].dataValues.id;
          recipe.Ingredients!.map(async (ingredient) => {
            const res = await createIngredient(ingredient);
            await createRecipeIngredient(
              RecipeIngredientZodel.parse({
                quantity: ingredient.RecipeIngredient.quantity,
                recipe_id: recipeId,
                ingredient_id: res?.dataValues.id,
              })
            );
          });
          recipe.RecipeSteps!.map(async (step) => {
            await createRecipeStep(
              RecipeStepZodel.parse({
                description: step.description,
                recipe_id: recipeId,
                step_number: step.step_number,
                ingredients: step.ingredients || undefined,
              })
            );
          });
        } else {
          res[0].set({ ...recipe });
          await res[0].save();
          // Handle Ingredients updates
          res[0].dataValues.Ingredients.map(
            async (ingredient: Ingredient, index: number) => {
              const ingredientId = ingredient.dataValues.id
                ? ingredient.dataValues.id
                : (await Ingredient.findOrCreate({
                    where: { name: ingredient.dataValues.name },
                  }))[0].dataValues.id;
              const recipeIngredient: any = await RecipeIngredient.findOrCreate(
                {
                  where: {
                    ingredient_id: ingredientId,
                    recipe_id: recipe.id,
                  },
                  defaults: {
                    quantity:
                      ingredient.dataValues.RecipeIngredient.dataValues
                        .quantity,
                    ingredient_id: ingredientId,
                    recipe_id: recipe.id,
                  },
                }
              );
              if (!recipeIngredient[0]._options.isNewRecord) {
                recipeIngredient[0].dataValues = {...res[0].dataValues.Ingredients[index].RecipeIngredient};
              }
            }
          );
          // Handle deleting unwanted ingredients
          const ingredientIds = res[0].dataValues.Ingredients.map(
            (ingredient: any) => {
              return ingredient.id;
            }
          );
          const unwantedRecipeIngredients = await RecipeIngredient.findAll({
            where: {
              ingredient_id: { [Op.notIn]: ingredientIds },
              recipe_id: recipe.id,
            },
          });
          unwantedRecipeIngredients.map(
            async (val: RecipeIngredient) => await val.destroy()
          );

          // Handle RecipeSteps updates
          const currentSteps = await RecipeStep.findAll({
            where: { recipe_id: res[0].dataValues.id },
          });
          currentSteps.map(async (step) => {
            await RecipeStep.destroy({ where: { id: step.dataValues.id } });
          });
          res[0].dataValues.RecipeSteps.map(async (step: RecipeStep) => {
            if (step.dataValues.id === undefined) {
              await RecipeStep.create({
                ...step.dataValues,
                recipe_id: res[0].dataValues.id,
              });
            } else {
              return await step.save();
            }
          });
        }
      }
    });
    return Promise.resolve(result);
  } catch (error) {
    console.log(`There was an error in createRecipe: ${error}`);
    return Promise.reject(error);
  }
}
