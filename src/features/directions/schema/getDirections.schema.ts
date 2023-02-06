import { z } from 'zod'

// env
import { IS_DEVMODE } from '@/config/env'

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

export const Schema = z.object({
  profileType: z.optional(
    z.string().refine((v) => ['walking', 'driving-traffic', 'driving', 'cycling'].includes(v)),
  ),
  start: z.string().refine((val) => {
    const [latitude, longitude] = val.split(',')
    const validLongitude = Number(longitude) >= -180 && Number(longitude) <= 180
    const validLatitude = Number(latitude) >= -90 && Number(latitude) <= 90
    return validLatitude && validLongitude
  }),
  end: z.string().refine((val) => {
    const [latitude, longitude] = val.split(',')
    const validLongitude = Number(longitude) >= -180 && Number(longitude) <= 180
    const validLatitude = Number(latitude) >= -90 && Number(latitude) <= 90
    return validLatitude && validLongitude
  }),
  ...(IS_DEVMODE && {
    place_id: z.optional(z.string()),
  }),
})

export type Props = z.infer<typeof Schema>
export type Coordinates = z.infer<typeof CoordinatesSchema>
