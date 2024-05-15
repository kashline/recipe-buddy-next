import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../connection.js'
import Ingredient from './Ingredient.js';
import Recipe from './Recipe.js';

export default class RecipeIngredient extends Model {}

/**
 * Model for a recipe's ingredients and quantities.  Contains associated recipe_id, ingredient_id, and quantity
 */
RecipeIngredient.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  quantity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Recipe,
        key: 'id'
    }
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Ingredient,
        key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'RecipeIngredient',
  // indexes: [
  //   {
  //     unique: true,
  //     fields: ['recipe_id', 'ingredient_id', 'quantity']
  //   }
  // ]
});

Recipe.belongsToMany(Ingredient, {through: RecipeIngredient, foreignKey: "recipe_id"})
Ingredient.belongsToMany(Recipe, {through: RecipeIngredient, foreignKey: "ingredient_id"})
