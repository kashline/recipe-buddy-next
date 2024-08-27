import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

/**
 * Model describing favoriting or saving a recipe to a user.
 */
export default class UserRecipe extends Model {}

UserRecipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // This doesn't seem to be actually doing anything
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserRecipe",
  },
);
