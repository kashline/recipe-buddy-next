import Recipe from "../data/models/Recipe"


export default async function Page(){
    // if (query){
    //     const res = await fetch(`http://localhost:3001/data/recipes?name=${query}`)
    //     const recipes = await res.json()
    //     return recipes
    // } else {
        const res = await fetch(`http://localhost:3000/api/recipes`, {method: "GET"})
        const recipes = await res.json()
        // console.log(recipes)
        // return recipes
    // }
}