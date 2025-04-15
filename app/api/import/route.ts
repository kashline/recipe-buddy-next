import { NextRequest, NextResponse } from "next/server";
import * as htmlparser2 from "htmlparser2";
import { RecipeZodel } from "@/app/lib/data/zodels/Recipe";
import validateImport from "@/app/api/import/validateimport";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const response = await fetch(parsedUrl.toString());

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.text();

    const fetchedOutput = data;
    const recipeData = await parseStuff(data);
    console.log(recipeData);
    if (recipeData !== undefined) {
      await validateImport(recipeData);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 },
    );
  }
}

async function parseStuff(data: string) {
  let recipe: string = "";
  const parser = new htmlparser2.Parser({
    ontext(text) {
      if (text.includes(`"@type": ["Recipe"]`)) {
        recipe = JSON.parse(text)[0];
      }
    },
    async onend() {
      return Promise.resolve(recipe);
    },
  });
  parser.write(data);
  parser.end();
  return parser.onend();
}
