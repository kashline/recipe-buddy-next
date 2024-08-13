import { z } from 'zod'

export const BuddyRequest = z.object({
    query: z.string(),
})

export type BuddyRequestZype = z.infer<typeof BuddyRequest>
