import { NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { withApiAuthRequired } from "@auth0/nextjs-auth0/edge";

export const runtime = "edge";

// const client = new OpenAI({
//   organization: "org-QklgaEIjSuqnBZ2ycN91JpAv",
//   project: "proj_2O7Yh51i2sgb1tNHWw1Azkb9",
// });

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.

Current conversation:
{chat_history}

User: {input}
AI:`;

export const POST = withApiAuthRequired(async (req: Request) => {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    /**
     * You can also try e.g.:
     *
     * import { ChatAnthropic } from "@langchain/anthropic";
     * const model = new ChatAnthropic({});
     *
     * See a full list of supported models at:
     * https://js.langchain.com/docs/modules/model_io/models/
     */
    const model = new ChatOpenAI({
      temperature: 0.8,
      model: "gpt-3.5-turbo-0125",
    });

    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and byte-encoding.
     */
    const outputParser = new HttpResponseOutputParser();

    /**
     * Can also initialize as:
     *
     * import { RunnableSequence } from "@langchain/core/runnables";
     * const chain = RunnableSequence.from([prompt, model, outputParser]);
     */
    const chain = prompt.pipe(model).pipe(outputParser);

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    });
    // Not sure what's happening here, streamText doesn't appear to have toDataStreamResponse function on it.  This is currently working.
    return new StreamingTextResponse(stream);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
  // try {
  //   // createUpdateAssistants()
  //   const data = await request.json();
  //   const chatCompletion = await client.chat.completions.create({
  //     messages: [{ role: "user", content: `${data.query}` }],
  //     model: "gpt-3.5-turbo",
  //   });
  //   console.log(chatCompletion.choices[0]);
  //   return Response.json(chatCompletion.choices[0]);
  // } catch (error) {
  //   console.log(error);
  //   return Response.json({ success: false, message: error }, { status: 500 });
  // }
});
