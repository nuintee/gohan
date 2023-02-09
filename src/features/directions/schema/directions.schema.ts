import { z } from 'zod'
import { CoordinatesSchema } from './coordinates.schema'

export const DirectionsInputSchema = z.object({
  start: CoordinatesSchema,
  destination: CoordinatesSchema,
})

export type DirectionsInput = z.infer<typeof DirectionsInputSchema>
