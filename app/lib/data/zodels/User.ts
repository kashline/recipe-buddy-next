import { z } from "zod";

export const UserZodel = z.object({
  id: z.number().optional(),
  firstName: z.string({ required_error: `"name" is required` }),
  lastName: z.string(),
});

export type UserZype = z.infer<typeof UserZodel>;
