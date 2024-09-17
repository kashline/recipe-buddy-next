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
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Recipe,
        key: "id",
      },
    },
    UserSub: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "auth0Id",
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
  foreignKey: "UserSub",
  sourceKey: "auth0Id",
});
Recipe.belongsToMany(User, { through: { model: UserRecipe } });
Recipe.hasMany(UserRecipe);
