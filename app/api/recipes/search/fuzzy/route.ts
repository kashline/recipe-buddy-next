import { NextRequest, NextResponse } from "next/server";
import Recipe from "@/app/data/models/Recipe";
import { Op } from "sequelize";
import { parseResponse } from "@/app/lib/utils/parseResponse";
import { getSession } from "@auth0/nextjs-auth0";

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
      const session = await getSession();
      const favorited = searchParams.get("favorited")
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
        limit: itemsPerPage,
        offset: itemsPerPage * (page! - 1),
      });
      return parseResponse({ data: data });
    } catch (error) {
      return NextResponse.json(
        {
          message: `There was an error ${error}`,
        },
        { status: 500 }
      );
    }
  }
}
