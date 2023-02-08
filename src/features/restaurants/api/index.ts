import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'

// data
import restaurantsData from '@/data/_places.json'
import { details } from '@/data/details'
import axios from 'axios'

// ENV
import { GCP_API_KEY } from '@/config/env'

// Schema
import { neededDetailsFields } from '../constants'
import { CoordinatesSchema } from '@/features/directions/schema/coordinates.schema'

// Utils
import { sleep } from '@/utils/sleep'

export const getRestaurant = procedure.input(CoordinatesSchema).query(async ({ input }) => {
  if (IS_DEVMODE) {
    await sleep(1000)

    const openNow = restaurantsData.results.filter((v) => v.opening_hours.open_now)
    const randomOne = openNow[Math.floor(Math.random() * openNow.length)]

    return randomOne
  } else if (IS_PRODMODE) {
    const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json')
    url.searchParams.append('location', `${input.latitude},${input.longitude}`)
    url.searchParams.append('radius', '500')
    url.searchParams.append('types', 'food')
    url.searchParams.append('opennow', 'true')
    url.searchParams.append('key', GCP_API_KEY)

    const { data } = await axios.get(url.toString())

    if (!['OK', 'ZERO_RESULTS'].includes(data.status)) throw new Error(data.status)

    return data
  } else {
    // test
  }
})

export const getRestaurantDetails = procedure
  .input(
    z.object({
      place_id: z.string(),
      neededOnly: z.optional(z.boolean()),
    }),
  )
  .query(async ({ input }) => {
    const { place_id, neededOnly } = input

    if (IS_DEVMODE) {
      return { ...details, result: details.result(place_id) }
    } else if (IS_PRODMODE) {
      // Google API
      const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
      url.searchParams.append('place_id', place_id)
      url.searchParams.append('key', GCP_API_KEY)

      if (neededOnly !== false) {
        url.searchParams.append('fields', neededDetailsFields.join(',')) // Needed Fields
      }

      const { data } = await axios.get(url.toString())

      if (!['OK', 'ZERO_RESULTS', 'INVALID_REQUEST', 'OVER_QUERY_LIMIT'].includes(data.status))
        throw new Error(data.status)

      return data
    } else {
      // test
    }
  })
