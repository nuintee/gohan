import { z } from 'zod'

// Env
import { GCP_API_KEY } from '@/config/env'
import axios from '@/libs/axios'

const Schema = z.object({
  latitude: z.string(),
  longitude: z.string(),
})

type Props = z.infer<typeof Schema>

export const getNearRestaurants = async (props: Props) => {
  await Schema.parse(props)

  const { latitude, longitude } = props

  const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json')
  url.searchParams.append('location', `${latitude}%2C${longitude}`)
  url.searchParams.append('radius', '500')
  url.searchParams.append('types', 'food')
  url.searchParams.append('opennow', 'true')
  url.searchParams.append('key', GCP_API_KEY)

  const data = await axios.get(url.toString())
  return data
}

// export async function fetchNearRestaurants({
//     latitude,
//     longitude,
//   }: {
//     latitude?: string | null
//     longitude?: string | null
//   }) {
//     if (!latitude || !longitude) throw new Error('invalid parameters')

//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=500&types=food&opennow=true&key=${GCP_KEY}`
//     const data: PlacesAPI = await _handleFetch(url)
//     return data
//   }

//   export async function fetchRestaurantDetail({ place_id }: { place_id?: string | null }) {
//     if (!place_id) throw new Error('invalid parameters')

//     const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GCP_KEY}`
//     const data: DetailsAPI = await _handleFetch(url)
//     return data
//   }
