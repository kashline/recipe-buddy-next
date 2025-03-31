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
import Test from "../../../data/models/Test";
import { Op } from "sequelize";

type RecipeWith_options = Recipe & {
  _options?: any;
};

export default async function createRecipe(recipe: RecipeZype) {
  try {
    await Recipe.sync().catch((err) => {
      console.log(err);
    });
    const result = await sequelize.transaction(async () => {
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
            const recipeIngredient: any = await RecipeIngredient.findOrCreate({
              where: {
                ingredient_id: ingredient.dataValues.id,
                recipe_id: recipe.id,
              },
              defaults: {
                quantity:
                  ingredient.dataValues.RecipeIngredient.dataValues.quantity,
                ingredient_id: ingredient.dataValues.id,
                recipe_id: recipe.id,
              },
            });
            if (!recipeIngredient[0]._options.isNewRecord) {
              res[0].dataValues.Ingredients[index].RecipeIngredient.save();
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
        res[0].dataValues.RecipeSteps.map((step: RecipeStep) => {
          console.log(step), step.save();
        });
      }

      // const recipeResponse = res![0];
      // console.log(recipeResponse)
      // const recipeResponseZodel = RecipeZodel.parse(recipeResponse);
      // recipe.id = recipeResponse.dataValues.id;
      // if (recipeResponse._options.isNewRecord) {
      //   console.log(`New recipe! ${recipeResponse.name}`);
      // } else {
      //   if (!_.isEqual(recipe, recipeResponseZodel)) {
      //     recipeResponse.set({
      //       ..._.merge(recipeResponseZodel, recipe),
      //     });
      //     console.log(`Data diff detected in ${recipeResponse.name}`);
      //     recipeResponse.save();
      //   }
      // }
      // Destroy all associated RecipeIngredients because it's easier than managing updates :/

      //   RecipeIngredient.destroy({
      //     where: {
      //       recipe_id: recipe.id,
      //     },
      //   });

      // });
    });
    return Promise.resolve(result);
  } catch (error) {
    console.log(`There was an error in createRecipe: ${error}`);
    return Promise.reject(error);
  }
}
