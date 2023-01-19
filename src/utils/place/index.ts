import { PlacesAPI, DetailsAPI, ResultsEntity } from '@/hooks/context/Restaurants/types'

const GCP_KEY = process.env.NEXT_PUBLIC_GCP_API_KEY

async function _handleFetch(url: string) {
  const query = await fetch(url)
  const data = await query.json()
  return data
}

export async function fetchNearRestaurants({
  latitude,
  longitude,
}: {
  latitude?: string | null
  longitude?: string | null
}) {
  if (!latitude || !longitude) throw new Error('invalid parameters')

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=500&types=food&opennow=true&key=${GCP_KEY}`
  const data: PlacesAPI = await _handleFetch(url)
  return data
}

export async function fetchRestaurantDetail({ place_id }: { place_id?: string | null }) {
  if (!place_id) throw new Error('invalid parameters')

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GCP_KEY}`
  const data: DetailsAPI = await _handleFetch(url)
  return data
}
