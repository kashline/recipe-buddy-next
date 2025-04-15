import Ingredient from "@/app/data/models/Ingredient";
import { Op } from "sequelize";

/**
 *
 * @param request API request
 * @returns Response {data: Ingredient[], status: number, error: error | undefined}
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url!);
    const ingredients = await Ingredient.findAll({
      where: {
        name: {
          [Op.like]: `%${searchParams.get("name")}%`,
        },
      },
      order: [["name", "ASC"]],
    });
    return Response.json({
      data: ingredients,
      status: 200,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      error: error,
      data: [],
    });
  }
}
