import { prompts } from "./prompts";
import OpenAI from "openai";
import { AssistantZodel } from "@/app/lib/data/zodels/Assistant";

const openai = new OpenAI();

export default function createUpdateAssistants() {
  prompts.map((prompt) => {
    const assistant = AssistantZodel.parse(prompt);
    console.log(assistant);
  });
}
