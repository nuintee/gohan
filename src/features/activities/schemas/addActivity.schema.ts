import { z } from 'zod'

export const addActivitySchema = z.object({
  user_id: z.optional(z.string()),
  place_id: z.optional(z.string()),
  is_liked: z.optional(z.boolean()),
})

export type UpdateActivityProps = z.infer<typeof addActivitySchema>
