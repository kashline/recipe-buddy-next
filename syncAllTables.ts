import Assistant from "@/app/data/models/Assistant";
import Ingredient from "@/app/data/models/Ingredient";
import Recipe from "@/app/data/models/Recipe";
import RecipeIngredient from "@/app/data/models/RecipeIngredient";
import RecipeStep from "@/app/data/models/RecipeStep";
import User from "@/app/data/models/User";
import UserRecipe from "@/app/data/models/UserRecipe";

async function syncAllTables() {
  try {
    await Assistant.sync();
    await Ingredient.sync();
    await Recipe.sync();
    await RecipeIngredient.sync();
    await RecipeStep.sync();
    await User.sync();
    await UserRecipe.sync();
    console.log(`Successfully synced all tables.`);
  } catch (error) {
    console.log(`Error syncing all tables: ${error}`);
  }
}
