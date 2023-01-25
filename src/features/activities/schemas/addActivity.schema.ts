import { z } from 'zod'

export const addActivitySchema = z.object({
  user_id: z.string(),
  place_id: z.optional(z.string()),
  is_liked: z.optional(z.boolean()),
})

export type AddActivityProps = z.infer<typeof addActivitySchema>
