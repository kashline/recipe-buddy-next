import Image from 'next/image';
import { unstable_noStore as noStore } from 'next/cache';
import Pagination from '../ui/pagination';
import TableRow from './TableRow';

export default async function RecipesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  noStore()
  const recipes = await (await fetch(`http://localhost:3000/api/recipes${query}`)).json()
  try{
    const recipesPerPage = 10
    const totalPages = Math.round(recipes.length/recipesPerPage) === 0 ? 1 : Math.round(recipes.length/recipesPerPage)
    const cursor = currentPage*recipesPerPage
    let lowerSlice
    let upperSlice
    if (currentPage === 1){
      lowerSlice = currentPage-1
      upperSlice = currentPage+recipesPerPage-1
    } else {
      lowerSlice = cursor-recipesPerPage
      upperSlice = cursor
    }
    const recipeSlice = recipes.slice(lowerSlice, upperSlice)
    return (
      <div className="mt-6 flow-root" >
        <div className="inline-block min-w-full align-middle" >
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0" >
            <table className="hidden min-w-full text-gray-900 md:table" >
              <thead className="rounded-lg text-left text-sm font-normal" >
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6" >
                    Recipe
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium" >
                    Difficulty
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium" >
                    Length
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3" >
                    <span className="sr-only" >Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white" >
                {recipeSlice?.map((recipe: any, index: number) => (
                  <TableRow 
                    difficulty={recipe.difficulty} 
                    name={recipe.name}
                    length={recipe.length}
                    image={recipe.image}
                    key={`${recipe.name}-tablerow`}
                    index={index}
                    >
                  </TableRow>
                ))}
              </tbody>
            </table>
            <Pagination totalPages={totalPages}/>
          </div>
        </div>
      </div>
    );
  } catch(error) {
    return (
      <div>
        uh oh mistake {String(error)}
      </div>
    )
  }
}
