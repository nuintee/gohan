import { z } from 'zod'

// prisma

import { ReviewStatus } from '@prisma/client'

const REVIEW_STATUS_ENUM = z.nativeEnum(ReviewStatus)
export type ReviewStatusType = z.infer<typeof REVIEW_STATUS_ENUM>

export const AddActivitySchema = z.object({
  activityId: z.optional(z.string().uuid()),
  place_id: z.string(),
  memo: z.optional(z.string()),
  reviewStatus: REVIEW_STATUS_ENUM,
})

export const UpdateActivitySchema = z.object({
  activityId: z.optional(z.string()),
  payload: z.object({
    memo: z.optional(z.string()),
    reviewStatus: REVIEW_STATUS_ENUM,
    place_id: z.string(),
  }),
})

export type AddActivityProps = z.infer<typeof AddActivitySchema>
