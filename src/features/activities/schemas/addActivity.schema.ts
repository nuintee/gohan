import { z } from 'zod'

export const addActivitySchema = z.object({
  user_id: z.string(),
  place_id: z.string(),
})
