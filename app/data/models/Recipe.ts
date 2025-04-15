import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

/**
 * Model for a recipe.  Contains the id, title, description, difficulty, preparationTime, cookingTime, image, video, tags, servings, owner, and aigenerated fields
 */
export default class Recipe extends Model {}

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
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    servings: {
      type: DataTypes.INTEGER,
    },
    owner: {
      type: DataTypes.STRING,
    },
    aigenerated: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "Recipe",
  },
);
