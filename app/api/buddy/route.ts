'use server'

import OpenAI from "openai";
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import createUpdateAssistants from "./createUpdateAssistants";

const client = new OpenAI({
    organization: 'org-QklgaEIjSuqnBZ2ycN91JpAv',
    project: 'proj_2O7Yh51i2sgb1tNHWw1Azkb9'
});

export const POST = 
withApiAuthRequired(
    async (request: Request) => {
    try {
        // createUpdateAssistants()
        const data = await request.json()
        const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: `${data.query}` }],
            model: 'gpt-3.5-turbo',
          });
          console.log(chatCompletion.choices[0]);
          return Response.json(chatCompletion.choices[0])
    } catch (error) {
        console.log(error)
        return Response.json(({success: false, message: error}), {status: 500})
    }
}
)
