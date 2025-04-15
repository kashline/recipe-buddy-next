import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Recipe from "./Recipe";
import User from "./User";

/**
 * Model describing comments on a recipe.  Contains id, recipeId, userId, and comment.
 */
export default class RecipeComment extends Model {}

RecipeComment.init(
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
    comment: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "RecipeComment",
  },
);

Recipe.hasMany(RecipeComment, {
  foreignKey: "recipeId",
});
RecipeComment.belongsTo(Recipe, { foreignKey: "recipeId" });
User.hasMany(RecipeComment, {
  foreignKey: "userId",
});
RecipeComment.belongsTo(User, { foreignKey: "userId" });
