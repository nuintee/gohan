import { GCP_API_KEY } from '@/config/env'
import axios from '@/libs/axios'
import { NEEDED_DETAIL_FIELDS } from '../constants'
import { DetailsAPI, ResultsEntity } from '../types'

async function useDetailsAPI<T extends ResultsEntity['place_id']>({ place_id }: { place_id: T }) {
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
  url.searchParams.append('place_id', place_id)
  url.searchParams.append('key', GCP_API_KEY)
  url.searchParams.append('fields', NEEDED_DETAIL_FIELDS.join(',')) // Needed Fields

  const { data } = await axios.get<DetailsAPI>(url.toString())

  if (!['OK', 'ZERO_RESULTS', 'INVALID_REQUEST', 'OVER_QUERY_LIMIT'].includes(data.status))
    throw new Error(data.status)

  return data.result
}

export default useDetailsAPI
