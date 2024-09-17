import { NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { withApiAuthRequired } from "@auth0/nextjs-auth0/edge";
import { gordonRamsay } from "./prompts";

export const runtime = "edge";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = gordonRamsay.instructions;

export const POST = withApiAuthRequired(async (req: Request) => {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);
    const model = new ChatOpenAI({
      temperature: 0.8,
      model: "gpt-3.5-turbo-0125",
    });
    const outputParser = new HttpResponseOutputParser();
    const chain = prompt.pipe(model).pipe(outputParser);
    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    });
    // Not sure what's happening here, streamText doesn't appear to have toDataStreamResponse function on it.  The deprecated StreamingTextReponse is currently working.
    return new StreamingTextResponse(stream);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
});
