import { z } from 'zod'

// env
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import axios from '@/libs/axios'

const Schema = z.object({
  profileType: z.string().refine((v) => ['walking'].includes(v)),
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
})

type Props = z.infer<typeof Schema>

export const getDirections = async (props: Props) => {
  const { profileType, start, end } = await Schema.parse(props)

  const base_coordinates = encodeURIComponent(`${start};${end}`)
  const profile = `mapbox/${profileType || 'walking'}`

  const url = new URL(`https://api.mapbox.com/directions/v5/${profile}/${base_coordinates}`)
  url.searchParams.append('alternative', 'true')
  url.searchParams.append('continue_straight', 'true')
  url.searchParams.append('geometries', 'geojson')
  url.searchParams.append('language', 'en')
  url.searchParams.append('overview', 'simplified')
  url.searchParams.append('steps', 'true')
  url.searchParams.append('access_token', MAPBOX_PUBLIC_TOKEN)

  const { data } = await axios.get(url.toString())
  return data
}
