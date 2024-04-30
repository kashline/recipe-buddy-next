import RecipesTable from "../ui/RecipesTable";
import Search from "../ui/search";

export default function Page({
    searchParams,
  }: {
    searchParams?: {
      name?: string;
      page?: string;
    };
  }){
    const name = searchParams?.name || '';
    const currentPage = Number(searchParams?.page) || 1;
    return(
      <div>
          <Search placeholder="Begin typing a recipe name"></Search>
          <RecipesTable query={name} currentPage={currentPage}/>
      </div>
    )
}