import { NextRequest, NextResponse } from "next/server";
import Recipe from "@/app/data/models/Recipe";
import { Op } from "sequelize";
import { parseResponse } from "@/app/lib/utils/parseResponse";
import UserRecipe from "@/app/data/models/UserRecipe";
import { RecipeZodel } from "../../../../lib/data/zodels/Recipe";
import { count } from "console";
import { auth } from "../../../../../auth";

export async function GET(request: NextRequest) {
  if (request.url?.split("?")[1] === undefined) {
    return NextResponse.json(
      {
        message: `You must provide 3 query parameters: {term: term to search by, page: current page, recipesPerPage: items per page}`,
      },
      { status: 400 }
    );
  } else {
    try {
      const { searchParams } = new URL(request.url!);
      const term = searchParams.get("term");
      const page = Number(searchParams.get("page"));
      const itemsPerPage = Number(searchParams.get("recipesPerPage"));
      const session = await auth();
      const favorited = searchParams.get("favorited") === "true";
      if (page === null || itemsPerPage === null) {
        return NextResponse.json(
          {
            message: `One of the query parameters is missing`,
            status: 500,
          },
          { status: 500 }
        );
      }
      const whereClause = [
        { description: { [Op.iLike]: `%${term}%` } },
        { title: { [Op.iLike]: `%${term}%` } },
        { tags: { [Op.contains]: [`${term}`] } },
        { difficulty: { [Op.iLike]: `%${term}%` } },
        !isNaN(Number(term)) ? { preparationTime: Number(term) } : {},
        !isNaN(Number(term)) ? { cookingTime: Number(term) } : {},
      ];
      const data = await Recipe.findAndCountAll({
        ...(term && {
          where: {
            [Op.or]: whereClause,
          },
        }),
        ...(favorited && {
          include: {
            model: UserRecipe,
            where: { UserEmail: session?.user?.email },
            required: true,
          },
        }),
        limit: itemsPerPage,
        offset: itemsPerPage * (page! - 1),
      });
      const recipes = data.rows.map((row) => {
        return RecipeZodel.parse(row.dataValues);
      });
      return Response.json({ status: 200, recipes: recipes, success: true, count: data.count });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: `There was an error ${error}`,
        },
        { status: 500 }
      );
    }
  }
}
