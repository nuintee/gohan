import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { BASE_URL, IS_DEVMODE, IS_PRODMODE } from '@/config/env'

// data
import restaurantsData from '@/data/_places.json'
import { details } from '@/data/details'
import axios from 'axios'

// ENV
import { GCP_API_KEY } from '@/config/env'

// Schema
import { NEEDED_DETAIL_FIELDS } from '../constants'

// Utils
import { sleep } from '@/utils/sleep'
import { trpc } from '@/libs/trpc'
import { DetailsAPI, PlacesAPI } from '../types'
import useDetailsAPI from '../hooks/useDetailsAPI'

const validInput = z.object({
  place_id: z.optional(z.string()),
  latitude: z.optional(z.number()),
  longitude: z.optional(z.number()),
})

const checkIsAnyValid = (v: z.infer<typeof validInput>) => {
  const isPlaceId = v?.place_id
  const isCoords = v?.latitude && v.longitude
  const isAnyValid = isPlaceId || isCoords

  return { isPlaceId, isCoords, isAnyValid }
}

const anyValid = validInput.refine(
  (v) => {
    const { isAnyValid } = checkIsAnyValid(v)
    return isAnyValid
  },
  { message: 'Must provide any' },
)

export const getRestaurants = procedure.input(anyValid).query(async ({ input }) => {
  const { isPlaceId } = checkIsAnyValid(input)
  if (IS_DEVMODE) {
    await sleep(1000)

    if (isPlaceId) {
      return details.result(input?.place_id as string)
    } else {
      const openNow = restaurantsData.results.filter((v) => v.opening_hours.open_now)
      const randomOne = openNow[Math.floor(Math.random() * openNow.length)]

      return randomOne
    }
  } else if (IS_PRODMODE) {
    if (isPlaceId) {
      // return details

      const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
      url.searchParams.append('place_id', input?.place_id as string)
      url.searchParams.append('key', GCP_API_KEY)
      url.searchParams.append('fields', NEEDED_DETAIL_FIELDS.join(',')) // Needed Fields

      const { data } = await axios.get<DetailsAPI>(url.toString())

      if (!['OK', 'ZERO_RESULTS', 'INVALID_REQUEST', 'OVER_QUERY_LIMIT'].includes(data.status))
        throw new Error(data.status)

      return data.result
    } else {
      // return random
      const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json')
      url.searchParams.append('location', `${input.latitude},${input.longitude}`)
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
  } else {
  }
})
