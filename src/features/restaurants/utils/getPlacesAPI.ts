import { GCP_API_KEY } from '@/config/env'
import axios from '@/libs/axios'
import { NEEDED_DETAIL_FIELDS } from '../constants'
import { DetailsAPI, PlacesAPI, ResultsEntity } from '../types'

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

  if (!['OK', 'ZERO_RESULTS'].includes(data.status)) throw new Error(data.status)

  const open_now = data.results?.filter((v) => v.opening_hours?.open_now) || []
  const random = open_now[Math.floor(Math.random() * open_now.length - 1)]
  return random
}

export default getPlacesAPI
