import Op from "sequelize/lib/operators";
import Ingredient from "./models/Ingredient";
import RecipeStep from "./models/RecipeStep";
import UserRecipe from "./models/UserRecipe";
import RecipeIngredient from "./models/RecipeIngredient";
import Recipe from "./models/Recipe";

export default async function getRecipeById(
  id: number,
  userSub: string | null
) {
  try {
    // This is required since the Recipe/Ingredient association is defined in RecipeIngredient
    RecipeIngredient.associations;
    const include: any = userSub
      ? [
          {
            model: Ingredient,
          },
          {
            model: RecipeStep,
          },
          { model: UserRecipe, where: { RecipeId: id, UserEmail: userSub }, required: false },
        ]
      : [{ model: Ingredient }, { model: RecipeStep }];
    const recipes = await Recipe.findOne({
      where: {
        id: id,
      },
      order: [
        ["title", "ASC"],
        [RecipeStep, "step_number", "ASC"],
      ],
      include: include,
    });
    return recipes?.dataValues;
  } catch (error) {
    console.error(`There was an error in getRecipeById: ${error}`);
  }
}
