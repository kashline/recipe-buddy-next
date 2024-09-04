import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Recipe from "./Recipe";
import User from "./User";

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
      references: {
        model: Recipe,
        key: "id",
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "UserRecipe",
  },
);

User.belongsToMany(Recipe, { through: { model: UserRecipe } });
Recipe.belongsToMany(User, { through: { model: UserRecipe } });
Recipe.hasMany(UserRecipe);
