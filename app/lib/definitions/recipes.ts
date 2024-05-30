export type Recipe = {
    name: string,
    difficulty: string,
    length: string,
    mealdb_id?: string | number,
    image?: string,
    video?: string
    Ingredients: Ingredient[],
    RecipeSteps: RecipeStep[],
}

export type Ingredient = {
    name: string
}

export type RecipeStep = {
    step: string,
    recipe_id: number,
    step_number: number
}
