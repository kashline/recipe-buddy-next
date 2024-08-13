import { z } from 'zod'

export const AssistantZodel = z.object({
    name: z.string(),
    openaiID: z.string().optional(),
    instructions: z.string(),
    model: z.string()
})

export type AssistantZype = z.infer<typeof AssistantZodel>
