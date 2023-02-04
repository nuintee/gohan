import { z } from 'zod'

const Schema = z.object({
  place_id: z.string(),
  onlyNeeded: z.optional(z.boolean()),
})

export const neededDetailsFields = [
  'name',
  'business_status',
  'geometry',
  'photos',
  'opening_hours',
  'website',
  'place_id',
] as const

export type Props = z.infer<typeof Schema>

export { Schema }
