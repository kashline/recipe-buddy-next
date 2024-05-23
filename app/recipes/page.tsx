import RecipesTable from "./RecipesTable";
import Search from "../ui/search";
import { useSearchParams } from "next/navigation";
import FilterDropdown from "./FilterDropdown";
import DefaultTopbar from "../ui/defaulttopbar";

export default function Page({
    searchParams,
  }: {
    searchParams?: {
      name?: string;
      ingredients?: string
      page?: string;
    };
  }){
    const query = Object.keys(searchParams!).map((key, index) => {
      if (index === 0){
        return `?${key}=${searchParams![key as keyof typeof searchParams]}`
      } else {
        return `${key}=${searchParams![key as keyof typeof searchParams]}`
      }
    }).join('&')
    return(
      <div>
          <FilterDropdown></FilterDropdown>
          <RecipesTable query={query}/>
      </div>
    )
}
