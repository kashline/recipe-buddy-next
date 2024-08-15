import { z } from "zod"

const UserZodel = z.object({
    id: z.number().optional(),
    firstName: z.string({required_error: `"name" is required`}),
    lastName: z.string(),

    // quantity: z.string({required_error: `"quantity" is required`})
})

export type RecipeZype = z.infer<typeof UserZodel>
