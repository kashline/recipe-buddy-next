import Recipe from "./models/Recipe";

export default async function DeleteRecipe(id: number){
    try {
        const res = await Recipe.destroy({
            where: {
                id: id
            }
        })
        return res
    } catch (error) {
        console.log(`There was an error in DeleteRecipe: ${error}`)
    }
}