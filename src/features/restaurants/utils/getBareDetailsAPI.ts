import { GCP_API_KEY, IS_PRODMODE } from '@/config/env'
import axios from '@/libs/axios'
import { NEEDED_DETAIL_FIELDS } from '../constants'
import { DetailsAPI, ResultsEntity } from '../types'

// data
import { details } from '@/data/details'

export async function getBareDetailsAPI<T extends ResultsEntity['place_id']>({
  place_id,
}: {
  place_id: T
}): Promise<DetailsAPI> {
  if (IS_PRODMODE) {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    url.searchParams.append('place_id', place_id)
    url.searchParams.append('key', GCP_API_KEY)
    url.searchParams.append('fields', NEEDED_DETAIL_FIELDS.join(',')) // Needed Fields

    const { data } = await axios.get<DetailsAPI>(url.toString())

    return data
  } else {
    const result = details.result(place_id)

    return {
      html_attributions: [],
      result,
      status: result ? 'OK' : 'ZERO_RESULTS',
    }
  }
}
