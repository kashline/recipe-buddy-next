'use server'

import Image from 'next/image';
import { unstable_noStore as noStore } from 'next/cache';
import Pagination from '../ui/pagination';
import TableRow from './TableRow';

export default async function RecipesTable({
  query,
}: {
  query: string;
}) {
  try{
    noStore()
    const recipeData: Map<string, Object> = new Map(await (await fetch(`${process.env.APP_URL}/api/recipes${query}`)).json())
    const recipes: any = recipeData.get('recipes')
    const recipesPerPage = 10
    const recipeCount = Number(recipeData.get('count'))
    const totalPages = Math.round(recipeCount/recipesPerPage) === 0 ? 1 : Math.round(recipeCount/recipesPerPage)
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
                {recipes?.map((recipe: any, index: number) => (
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
        There was a problem reading/parsing data from the database: {String(error)}
      </div>
    )
  }
}
