export type Recipe = {
    id: number,
    name: string,
    difficulty: string,
    length: string,
    mealdb_id: string | number,
    image: string,
    video: string
    Ingredients: Ingredient[],
    RecipeSteps: RecipeStep[],
}

export type Ingredient = {
    
}

export type RecipeStep = {
    id: number,
    step: string,
    recipe_id: number,
    step_number: number
}
