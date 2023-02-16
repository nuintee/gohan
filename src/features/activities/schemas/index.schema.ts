import { z } from 'zod'

import { ReviewStatus } from '@prisma/client'

const REVIEW_STATUS_ENUM = z.nativeEnum(ReviewStatus)

export const AddActivitySchema = z.object({
  activityId: z.optional(z.string().uuid()),
  userId: z.string().uuid(),
  place_id: z.optional(z.string()),
  memo: z.optional(z.string()),
  reviewStatus: REVIEW_STATUS_ENUM,
})

export const UpdateActivitySchema = z.object({
  activityId: z.string(),
  payload: z.object({
    memo: z.optional(z.string()),
    reviewStatus: REVIEW_STATUS_ENUM,
  }),
})

export type AddActivityProps = z.infer<typeof AddActivitySchema>
export type UpdateActivityProps = z.infer<typeof UpdateActivitySchema>
