import User from "./User"
import Recipe from "./Recipe"
import UserRecipe from "./UserRecipe"

User.belongsToMany(Recipe, { through: {model: UserRecipe} })
Recipe.belongsToMany(User, { through: {model: UserRecipe} })

export { UserRecipe }
