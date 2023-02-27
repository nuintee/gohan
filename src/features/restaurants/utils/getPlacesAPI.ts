import { GCP_API_KEY, IS_DEVMODE } from '@/config/env'
import { IS_BROWSER } from '@/config/mode'
import axios from '@/libs/axios'
import { sleep } from '@/utils/sleep'
import { PlacesAPI } from '../types'

async function getPlacesAPI<T extends Pick<GeolocationCoordinates, 'latitude' | 'longitude'>>(
  props: T,
) {
  const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json')
  url.searchParams.append('location', `${props.latitude},${props.longitude}`)
  url.searchParams.append('radius', '500')
  url.searchParams.append('types', 'restaurant') // old types was food
  url.searchParams.append('opennow', 'true')
  url.searchParams.append('key', GCP_API_KEY)

  const { data } = await axios.get<PlacesAPI>(url.toString())

  return data
}

export default getPlacesAPI
