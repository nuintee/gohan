import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { sleep } from '@/utils/sleep'
import axios from 'axios'

// Env
import { IS_DEVMODE, IS_PRODMODE, MAPBOX_PUBLIC_TOKEN } from '@/config/env'

// Schema
import { CoordinatesSchema } from '../schema/coordinates.schema'
import { DirectionsAPI } from '../types/api'

// Data
import directions from '@/data/_directions.json'

export const getDirections = procedure
  .input(z.array(CoordinatesSchema).max(2))
  .query(async ({ input }) => {
    const [a, b] = input

    if (IS_DEVMODE) {
      // mock as msw
      sleep(1000)

      return {}
    } else if (IS_PRODMODE) {
      const url = new URL(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${a.latitude},${a.longitude};${b.latitude},${b.longitude}`,
      )
      url.searchParams.append('alternatives', 'true')
      url.searchParams.append('continue_straight', 'true')
      url.searchParams.append('geometries', 'geojson')
      url.searchParams.append('language', 'en')
      url.searchParams.append('overview', 'simplified')
      url.searchParams.append('steps', 'true')
      url.searchParams.append('access_token', MAPBOX_PUBLIC_TOKEN)

      const { data } = await axios.get<DirectionsAPI>(url.toString())

      return data
    } else {
      // test
      return {
        a,
        b,
      }
    }
  })
