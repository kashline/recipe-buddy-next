import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from '@ai-sdk/openai';
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { RecipeZodel } from "@/app/lib/data/zodels/Recipe";

export const runtime = "edge";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const currentMessageContent = messages[messages.length - 1].content;
    
    const {object} = await generateObject({
        model: openai("gpt-4-turbo"),
        schema: RecipeZodel,
        prompt: currentMessageContent
    })
    const outputParser = new HttpResponseOutputParser();
    // Not sure what's happening here, streamText doesn't appear to have toDataStreamResponse function on it.  The deprecated StreamingTextReponse is currently working.
    return new Response(JSON.stringify(object), {
        status: 200,
        })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
};
