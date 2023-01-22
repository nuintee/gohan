import { z } from 'zod'
import axios from '@/libs/axios'

// env
import { GCP_API_KEY } from '@/config/env'
import { DetailsAPI } from '../types'

const Schema = z.object({
  place_id: z.string(),
})

type Props = z.infer<typeof Schema>

export const getRestaurantDetails = async (props: Props) => {
  const { place_id } = await Schema.parse(props)
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
  url.searchParams.append('place_id', place_id)
  url.searchParams.append('key', GCP_API_KEY)

  const { data } = await axios.get<DetailsAPI>(url.toString())

  if (!['OK', 'ZERO_RESULTS'].includes(data.status)) throw new Error(data.status)

  return data
}
