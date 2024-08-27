import Ingredient from "@/app/data/models/Ingredient";
import { Op } from "sequelize";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url!);
  const ingredients = await Ingredient.findAll({
    where: {
      name: {
        [Op.like]: `%${searchParams.get("name")}%`,
      },
    },
    attributes: ["name"],
    order: [["name", "ASC"]],
  });
  return Response.json(
    ingredients.map((ingredient) => {
      return ingredient.dataValues.name
        .split(" ")
        .map((word: string) => {
          return `${word[0].toUpperCase()}${word.slice(1)}`;
        })
        .join(" ");
    }),
  );
}
