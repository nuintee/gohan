import { z } from 'zod'

export const CoordinatesSchema = z.object({
  latitude: z.number().refine(
    (v) => {
      return v >= -90 && v <= 90
    },
    { message: 'latitude must be between -90 and 90' },
  ),
  longitude: z.number().refine(
    (v) => {
      return v >= -180 && v <= 180
    },
    { message: 'longitude must be between -180 and 180' },
  ),
})

export type Coordinates = z.infer<typeof CoordinatesSchema>
