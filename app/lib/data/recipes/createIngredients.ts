import Ingredient from "@/app/data/models/Ingredient";
import { IngredientZype } from "../zodels/Recipe";

export default async function createIngredient(ingredient: IngredientZype) {
  try {
    await Ingredient.sync().catch((err) => {
      console.log(err);
    });
    const res = await Ingredient.findOrCreate({
      where: {
        name: ingredient.name,
      },
      defaults: {
        name: ingredient.name,
      },
    }).catch((err) => {
      console.log(err);
    });
    return await res![0].save();
  } catch (error) {
    console.log(`There was an error in createIngredient: ${error}`);
  }
}
