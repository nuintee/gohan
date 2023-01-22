import { z } from 'zod'

export const addUserSchema = z.object({
  email: z.string().email(),
  username: z.string(),
})
