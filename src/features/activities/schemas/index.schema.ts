import { z } from 'zod'

export const addActivitySchema = z.object({
  activityId: z.optional(z.string().uuid()),
  userId: z.string().uuid(),
  place_id: z.optional(z.string()),
  is_liked: z.optional(z.boolean()),
})

export const updateActivitySchema = z.object({
  activityId: z.string(),
  payload: z.object({
    is_liked: z.boolean(),
  }),
})

export type AddActivityProps = z.infer<typeof addActivitySchema>
export type UpdateActivityProps = z.infer<typeof updateActivitySchema>
