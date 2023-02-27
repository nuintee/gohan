import { GCP_API_KEY } from '@/config/env'
import { IS_BROWSER } from '@/config/mode'
import axios from '@/libs/axios'
import { sleep } from '@/utils/sleep'
import { PlacesAPI } from '../types'

async function getPlacesAPI<T extends Pick<GeolocationCoordinates, 'latitude' | 'longitude'>>(
  props: T,
) {
  if (!IS_BROWSER) {
    // server mock
    return sleep(100).then(() => ({ a: 2 }))
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json')
  url.searchParams.append('location', `${props.latitude},${props.longitude}`)
  url.searchParams.append('radius', '500')
  url.searchParams.append('types', 'restaurant') // old types was food
  url.searchParams.append('opennow', 'true')
  url.searchParams.append('key', GCP_API_KEY)

  const { data } = await axios.get<PlacesAPI>(url.toString())

  if (!['OK', 'ZERO_RESULTS'].includes(data.status)) throw new Error(data.status)

  const open_now = data.results?.filter((v) => v.opening_hours?.open_now) || []
  const random = open_now[Math.floor(Math.random() * open_now.length - 1)]
  return random
}

export default getPlacesAPI
