import Ingredient from "@/app/data/models/Ingredient"

export async function GET(){
    const ingredients  = await Ingredient.findAll({
        attributes: ['name'],
        order: [
            ['name', 'ASC'],
        ]
    })
    return Response.json(ingredients.map((ingredient) => {return ingredient.dataValues.name.split(' ').map(
        (word: string) => {return `${word[0].toUpperCase()}${word.slice(1)}`}).join(' ')}))
}