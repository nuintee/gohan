import { z } from 'zod'

// Env
import { GCP_API_KEY } from '@/config/env'

// libs
import axios from '@/libs/axios'

// types
import { PlacesAPI } from '../types'

// schemas
import { Schema, Props } from '../schemas/getNearRestaurants.schema'

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
