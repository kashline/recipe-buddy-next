import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Recipe from "./Recipe";
import User from "./User";

/**
 * Model describing favoriting or saving a recipe to a user.  Contains RecipeId, and UserEmail
 */
export default class UserRecipe extends Model {}

UserRecipe.init(
  {
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Recipe,
        key: "id",
      },
    },
    UserEmail: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "email",
      },
    },
  },
  {
    sequelize,
    modelName: "UserRecipe",
  },
);

User.belongsToMany(Recipe, {
  through: { model: UserRecipe },
  foreignKey: "UserEmail",
  sourceKey: "email",
});
Recipe.belongsToMany(User, { through: { model: UserRecipe } });
Recipe.hasMany(UserRecipe);
