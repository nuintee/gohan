import { procedure } from '@/server/trpc'
import { z } from 'zod'

import { getBarePlacesAPI } from '../utils/getBarePlacesAPI'
import { TRPCClientError } from '@trpc/client'
import { statusMapper } from '../utils/statusMapper'

export const getRestaurants = procedure
  .input(
    z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  )
  .query(async ({ input }) => {
    const data = await getBarePlacesAPI({ latitude: input.latitude, longitude: input.longitude })

    if (data.status === 'OK') {
      return data.results?.random() // returnRandomOne
    } else {
      throw new TRPCClientError(statusMapper(data.status), { cause: new Error(data.status) })
    }
  })
