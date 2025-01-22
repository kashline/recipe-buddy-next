import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

/**
 * Model for a recipe.  Contains the name, difficulty, length, mealdb_id, image url, and video url.
 */
export default class Recipe extends Model {
  _options: any;
  name: any;
  difficulty: any;
  length: any;
  mealdb_id: any;
  image: any;
  video: any;
}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: { type: DataTypes.STRING(512) },
    difficulty: {
      type: DataTypes.STRING,
    },
    preparationTime: {
      type: DataTypes.INTEGER,
    },
    cookingTime: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    video: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    servings: {
      type: DataTypes.INTEGER
    },
    owner: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "Recipe",
  }
);
