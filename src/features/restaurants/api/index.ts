import { procedure } from '@/server/trpc'
import { z } from 'zod'

import { getBarePlacesAPI } from '../utils/getBarePlacesAPI'
import { TRPCClientError } from '@trpc/client'
import { statusMapper } from '../utils/statusMapper'
import { getDominantColor } from '@/libs/rgbaster'
import { isAPIRateLimited } from '@/server/middleware'

export const getRestaurants = procedure
  .use(isAPIRateLimited)
  .input(
    z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  )
  .query(async ({ input }) => {
    const data = await getBarePlacesAPI({ latitude: input.latitude, longitude: input.longitude })

    if (data.status === 'OK') {
      if (!data.results?.length) {
        throw new TRPCClientError(statusMapper(data.status), { cause: new Error(data.status) })
      } else {
        const res = data.results.random()
        const color = await getDominantColor()
        return { ...res, color }
      }
    } else {
      throw new TRPCClientError(statusMapper(data.status), { cause: new Error(data.status) })
    }
  })
