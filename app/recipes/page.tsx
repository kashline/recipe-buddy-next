import RecipesTable from "./RecipesTable";
import Search from "../ui/search";
import { useSearchParams } from "next/navigation";

export default function Page({
    searchParams,
  }: {
    searchParams?: {
      name?: string;
      ingredients?: string
      page?: string;
    };
  }){
    // const name = searchParams?.name || '';
    const query = Object.keys(searchParams!).map((key, index) => {
      if (key !== 'page'){
        if (index === 0){
          return `?${key}=${searchParams![key as keyof typeof searchParams]}`
        } else {
          return `${key}=${searchParams![key as keyof typeof searchParams]}`
        }
      }
    }).join('&')
    const currentPage = Number(searchParams?.page) || 1;
    return(
      <div>
          <Search placeholder="Begin typing a recipe name" param="name"></Search>
          <Search placeholder="Begin typing an ingredient" param="ingredients"></Search>
          <RecipesTable query={query} currentPage={currentPage}/>
      </div>
    )
}