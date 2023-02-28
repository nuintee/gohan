import { procedure } from '@/server/trpc'
import { z } from 'zod'

import { getBarePlacesAPI } from '../utils/getBarePlacesAPI'
import { TRPCClientError } from '@trpc/client'
import { statusMapper } from '../utils/statusMapper'
import { getDominantColor } from '@/libs/rgbaster'
import usePlacePhotos from '@/features/details/hooks/usePlacePhotos'

export const getRestaurants = procedure
  .input(
    z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  )
  .query(async ({ input }) => {
    const data = await getBarePlacesAPI({ latitude: input.latitude, longitude: input.longitude })

    const res = data.results?.random()
    const color = await getDominantColor(usePlacePhotos(res?.photos).url)

    if (data.status === 'OK') {
      return { ...res, color } // returnRandomOne
    } else {
      throw new TRPCClientError(statusMapper(data.status), { cause: new Error(data.status) })
    }
  })
