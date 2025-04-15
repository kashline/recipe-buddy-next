import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Recipe from "./Recipe";
import User from "./User";

/**
 * Model describing ratings for a recipe.  Contains id, recipeId, userId, and rating.
 */
export default class RecipeRating extends Model {}

RecipeRating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Recipe,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
  },
  {
    sequelize,
    modelName: "RecipeRating",
  },
);

Recipe.hasMany(RecipeRating, {
  foreignKey: "recipeId",
});
RecipeRating.belongsTo(Recipe, { foreignKey: "recipeId" });
User.hasMany(RecipeRating, {
  foreignKey: "userId",
});
RecipeRating.belongsTo(User, { foreignKey: "userId" });
