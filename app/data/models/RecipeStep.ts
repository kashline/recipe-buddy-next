import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Recipe from "./Recipe";

/**
 * Model of a recipe's steps containing the id, description, recipe_id, step_number, and ingredients
 */
export default class RecipeStep extends Model {}

RecipeStep.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Recipe,
        key: "id",
      },
    },
    step_number: {
      type: DataTypes.INTEGER,
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
  },
  {
    sequelize,
    modelName: "RecipeStep",
  },
);

Recipe.hasMany(RecipeStep, { foreignKey: "recipe_id" });
RecipeStep.belongsTo(Recipe, { foreignKey: "recipe_id" });
