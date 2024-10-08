import { getSession } from "@auth0/nextjs-auth0";
import _ from "lodash";
import { Op } from "sequelize";
import Ingredient from "./models/Ingredient";
import Recipe from "./models/Recipe";
import RecipeIngredient from "./models/RecipeIngredient";
import RecipeStep from "./models/RecipeStep";
import UserRecipe from "./models/UserRecipe";

export default async function GetRecipe(props?: URLSearchParams) {
  try {
    const session = await getSession();
    const userSub =
      session !== null && session !== undefined ? session.user.sub : null;
    var promises: Promise<number[] | undefined>[] = [];
    const page = Number(props?.get("page") || 1);
    const favorited = Boolean(props?.get("favorited") || false);
    const itemsPerPage = Number(props?.get("recipesPerPage") || 10);
    const attributes: string[] = [
      "name",
      "difficulty",
      "length",
      "image",
      "video",
      "id",
    ];
    if (props != null) {
      props.forEach(async (value, key) => {
        if (["name", "difficulty", "length"].includes(key)) {
          promises.push(findAllRecipes(key, value));
          return;
        }
        if (key === "ingredients") {
          promises.push(findAllIngredients(value));
          return;
        }
        if (key === "attributes") {
          props
            .get("attributes")
            ?.split(",")
            .map((attribute) => {
              attributes.push(attribute);
            });
          return;
        }
      });
    }

    // Default case no query parameters
    if (promises.length === 0) {
      const res = new Map();
      const recipes = await Recipe.findAll({
        limit: itemsPerPage,
        offset: itemsPerPage * (page! - 1),
        order: [["name", "ASC"]],
        attributes: attributes,
        include:
          userSub !== null
            ? {
                model: UserRecipe,
                where: {
                  UserSub: userSub,
                },
                required: favorited,
              }
            : undefined,
      });
      const count = await Recipe.count({
        include:
          userSub !== null
            ? {
                model: UserRecipe,
                where: {
                  UserSub: userSub,
                },
                required: favorited,
              }
            : undefined,
      });
      res.set("recipes", recipes);
      res.set("count", count);
      return res;
    }

    // Return all the promises by merging the id arrays and finding each recipe
    return await Promise.all(promises).then((response) => {
      return findRecipeById(
        mergeArrays(response),
        itemsPerPage,
        favorited,
        attributes,
        page,
        userSub,
      );
    });
  } catch (error) {
    console.log(`There was an error in GetRecipe: ${error}`);
    return error;
  }
}

async function findRecipeById(
  ids: number[],
  itemsPerPage: number,
  favorited: boolean,
  attributes?: string[],
  page?: number,
  userSub?: string,
) {
  try {
    const res = new Map();
    const include: any =
      ids.length === 1
        ? [
            {
              model: Ingredient,
            },
            {
              model: RecipeStep,
            },
          ]
        : [];
    if (userSub !== null && userSub !== undefined) {
      include.push({
        model: UserRecipe,
        where: {
          RecipeId: {
            [Op.in]: ids,
          },
          UserSub: userSub,
        },
        required: favorited,
      });
    }
    const recipes = await Recipe.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      limit: itemsPerPage,
      offset: itemsPerPage * (page! - 1),
      order:
        ids.length === 1
          ? [
              ["name", "ASC"],
              [RecipeStep, "step_number", "ASC"],
            ]
          : [["name", "ASC"]],
      attributes: attributes,
      include: include,
    });
    const count = await Recipe.count({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    if (userSub !== null) {
    }
    res.set("recipes", recipes);
    res.set("count", count);
    return res;
  } catch (error) {
    console.error(`There was an error in findRecipeById: ${error}`);
  }
}

async function findAllRecipes(key: string, value: string) {
  try {
    let addedLikeOperator = value
      .split(",")
      .map((word) => ({ [Op.iLike]: `%${word || ""}%` }));
    const recipeIds = await Recipe.findAll({
      attributes: ["id"],
      where: {
        [key]: {
          [Op.or]: addedLikeOperator,
        },
      },
    }).then((recipes) => {
      return _.map(recipes, (recipe) => {
        return recipe.dataValues.id;
      });
    });
    return new Promise<number[]>((resolve) => {
      resolve(recipeIds);
    });
  } catch (error) {
    console.log(`Error in findAllRecipes: ${error}`);
  }
}

async function findAllIngredients(ingredient: string) {
  try {
    // Get ingredient IDs
    const ingredients = await Ingredient.findAll({
      attributes: ["id"],
      where: {
        name: {
          [Op.or]: { [Op.iLike]: `%${ingredient.split(",")}%` },
        },
      },
    });

    // Push recipe name to return array
    const recipeIds = await Promise.all(
      ingredients.map(async (ingredient) => {
        const recipeIngredient = await RecipeIngredient.findAll({
          attributes: ["recipe_id"],
          where: {
            ingredient_id: ingredient.dataValues.id,
          },
        });
        return recipeIngredient.map((recipe) => {
          return recipe.dataValues.recipe_id;
        });
      }),
    );
    return new Promise<number[]>((resolve) => {
      resolve(mergeArrays(recipeIds));
    });
  } catch (error) {
    console.log(`Error in findAllIngredients: ${error}`);
  }
}

function mergeArrays(arrays: any[]) {
  let master: any[] = [];
  arrays.map((array) => {
    master = merge(array, master);
  });
  return master;
}

const merge = (
  a: number[],
  b: number[],
  predicate = (a: number, b: number) => a === b,
) => {
  const c = [...a]; // copy to avoid side effects
  // add all items from B to copy C if they're not already present
  b.forEach((bItem: number) =>
    c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem),
  );
  return c;
};
