import { NextRequest, NextResponse } from "next/server";
import Recipe from "@/app/data/models/Recipe";
import { Op } from "sequelize";
import UserRecipe from "@/app/data/models/UserRecipe";
import { RecipeZodel } from "../../../../lib/data/zodels/Recipe";
import { auth } from "../../../../../auth";
import RecipeRating from "@/app/data/models/RecipeRating";

/**
 *
 * @param request NextRequest
 * @returns NextResponse: {status: number, message?: string, recipes?: Recipe[], success?: bool, count?: number}
 */
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
      const include: any[] = [{ model: RecipeRating }];
      if (favorited) {
        include.push({
          model: UserRecipe,
          where: { UserEmail: session?.user?.email },
          required: true,
        });
      }
      const data = await Recipe.findAndCountAll({
        ...(term && {
          where: {
            [Op.or]: whereClause,
          },
        }),
        include: include,
        limit: itemsPerPage,
        offset: itemsPerPage * (page! - 1),
      });
      const recipes = data.rows.map((row) => {
        return RecipeZodel.parse(row.dataValues);
      });
      return Response.json(
        {
          recipes: recipes,
          success: true,
          count: data.count,
        },
        { status: 200 }
      );
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
