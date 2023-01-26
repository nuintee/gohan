import { z } from 'zod'

// env
import { IS_DEVMODE } from '@/config/env'

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