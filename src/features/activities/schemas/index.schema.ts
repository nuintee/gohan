import { z } from 'zod'

import { ReviewStatus } from '@prisma/client'

const REVIEW_STATUSES: ReviewStatus[] = ['BAD', 'GOOD', 'NEW', 'OK']

export const AddActivitySchema = z.object({
  activityId: z.optional(z.string().uuid()),
  userId: z.string().uuid(),
  place_id: z.optional(z.string()),
  memo: z.optional(z.string()),
})

export const UpdateActivitySchema = z.object({
  activityId: z.string(),
  payload: z.object({
    memo: z.optional(z.string()),
    reviewStatus: z.string().refine((v) => {
      return REVIEW_STATUSES.includes(v)
    }),
  }),
})

export type AddActivityProps = z.infer<typeof AddActivitySchema>
export type UpdateActivityProps = z.infer<typeof UpdateActivitySchema>
