import { RecipeZodel } from "@/app/lib/data/zodels/Recipe";
import { google } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";

export default async function validateImport(recipe: string) {
  const model = google("gemini-1.5-pro-latest", {
    // safetySettings: [
    //   {
    //     category: "HARM_CATEGORY_UNSPECIFIED",
    //     threshold: "BLOCK_LOW_AND_ABOVE",
    //   },
    // ],
  });
//   console.log(recipe);
  return 'asdf';
  //   const { object } = await generateObject({
  //     model: model,
  //     prompt: `Take the following recipe and rewrite it in the provided schema.  Determine which incoming fields should correspond to the outgoing schema.  If a field does not seem to correspond to any outgoing schema fields, ignore it.  Only take data that is related to the recipe.  This is the data you are to rewrite: ${recipe[0]}`,
  //     schema: RecipeZodel,
  //   });
  //   console.log(object)
}
