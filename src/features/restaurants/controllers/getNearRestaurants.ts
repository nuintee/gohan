import { z } from 'zod'

// Env
import { GCP_API_KEY } from '@/config/env'
import axios from '@/libs/axios'
import { PlacesAPI } from '../types'

const Schema = z.object({
  latitude: z
    .string()
    .transform((v) => Number(v))
    .refine(
      (v) => {
        return v >= -90 && v <= 90
      },
      { message: 'latitude must be between -90 and 90' },
    ),
  longitude: z
    .string()
    .transform((v) => Number(v))
    .refine(
      (v) => {
        return v >= -180 && v <= 180
      },
      { message: 'longitude must be between -180 and 180' },
    ),
  randomOne: z.optional(z.string().transform((v) => Boolean(v))),
})

type Props = z.infer<typeof Schema>

const getNearRestaurants = async (props: Props) => {
  const { latitude, longitude, randomOne } = await Schema.parse(props)

  const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json')
  url.searchParams.append('location', `${latitude},${longitude}`)
  url.searchParams.append('radius', '500')
  url.searchParams.append('types', 'food')
  url.searchParams.append('opennow', 'true')
  url.searchParams.append('key', GCP_API_KEY)

  const { data } = await axios.get<PlacesAPI>(url.toString())

  if (!['OK', 'ZERO_RESULTS'].includes(data.status)) throw new Error(data.status)

  if (!randomOne) return data

  return data?.results[Math.floor(Math.random() * data.results?.length)] || {}
}

export default getNearRestaurants
