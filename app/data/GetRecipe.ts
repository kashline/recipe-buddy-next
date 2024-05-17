import Ingredient from "./models/Ingredient.js"
import Recipe from "./models/Recipe.js"
import RecipeStep from "./models/RecipeStep.js"
import RecipeIngredient from "./models/RecipeIngredient.js"
import {Op} from "sequelize"
import _ from "lodash"

export default async function GetRecipe(props?: URLSearchParams){
    try {
        var promises: Promise<number[] | undefined>[] = []
        const itemsPerPage = 10
        if (props != null) {
            props.forEach(async (value, key) => {
                switch (key) {
                    case 'ingredients':
                        promises.push(findAllIngredients(value))
                        break;
                    case 'name':
                        promises.push(findAllRecipes(key, value))
                        break;
                    case 'difficulty':
                        promises.push(findAllRecipes(key, value))
                        break;
                    case 'legnth':
                        promises.push(findAllRecipes(key, value))
                        break;
                    default:
                        break;
                }
        })} 
        if (promises.length === 0){
            return await Recipe.findAll({
                order: [
                    ['name', "ASC"]
                ],
                attributes: ['name', 'difficulty', 'length', 'image'],
                include: [
                    {
                        model: Ingredient
                    },
                    {
                        model: RecipeStep
                    }
                ]
            })
        }
        return Promise.all(promises).then((response) => {
            return findRecipeById(mergeArrays(response))
        })
    } catch (error) {
        console.log(`There was an error in GetRecipe: ${error}`)
        return error
    }
}

async function findRecipeById(ids: number[]){
    try{
        return await Recipe.findAll({
            where: {
                id: {
                    [Op.in]: ids
                }
            },
            include: [
                {
                    model: Ingredient
                },
                {
                    model: RecipeStep
                }
            ]
        })
    } catch (error) {
        console.error(`There was an error in findRecipeById: ${error}`)
    }
}

async function findAllRecipes(key: string, value: string){
    try{
        let addedLikeOperator = value.split(',').map((word) => ({ [Op.iLike]: `%${word || ""}%` }))
        const recipeIds = await Recipe.findAll({
            attributes: ['id'],
            where: {
                [key]: {
                    [Op.or]: addedLikeOperator
                }
            }
        }).then((recipes) => {
            return _.map(recipes, (recipe) => {return recipe.dataValues.id})
        })
        return new Promise<number[]> ((resolve) => {resolve(recipeIds)})
    } catch (error) {
        console.log(`Error in findAllRecipes: ${error}`)
    }
}

async function findAllIngredients(ingredient: string){
    try{

        // Get ingredient IDs
        const ingredients = await Ingredient.findAll({
            attributes: [ 'id' ],
            where: {
                name: {
                    [Op.or]: ingredient.split(',')
                }
            }
        })

        // Push recipe name to return array
        const recipeIds = await Promise.all(ingredients.map(async (ingredient) => {
            const recipeIngredient = await RecipeIngredient.findAll({
                attributes: [ 'recipe_id' ],
                where: {
                    ingredient_id: ingredient.dataValues.id
                }
            })
            return recipeIngredient.map((recipe) => {
                return (recipe.dataValues.recipe_id)
            })
        }))
        return new Promise<number[]> ((resolve) => {resolve(mergeArrays(recipeIds))}) 
        // return recipeIds
        
    } catch (error) {
        console.log(`Error in findAllIngredients: ${error}`)
    }
}

function mergeArrays(arrays: any[]){
    let master: any[] = []
    arrays.map((array) => {
        master = merge(array, master)
    })
    return master
}

const merge = (a: number[], b: number[], predicate = (a: number, b: number) => a === b) => {
    const c = [...a]; // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem: number) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
    return c;
}
