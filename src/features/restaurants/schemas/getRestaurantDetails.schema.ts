import { z } from 'zod'

const Schema = z.object({
  place_id: z.string(),
})

export const neededDetailsFields = [
  'name',
  'business_status',
  'geometry',
  'photos',
  'opening_hours',
] as const

export type Props = z.infer<typeof Schema>

export { Schema }
