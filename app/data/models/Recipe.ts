import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection'
import Ingredient from './Ingredient';

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

Recipe.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  difficulty: {
    type: DataTypes.STRING
  },
  length: {
    type: DataTypes.STRING
  },
  mealdb_id: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  video: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Recipe'
});

Recipe.hasMany(Ingredient, { foreignKey: 'recipeId' })
