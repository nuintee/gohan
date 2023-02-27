import { getBareDetailsAPI } from '@/features/restaurants/utils/getBareDetailsAPI'
import { getBarePlacesAPI } from '@/features/restaurants/utils/getBarePlacesAPI'
import { procedure } from '@/server/trpc'
import { TRPCClientError } from '@trpc/client'
import { z } from 'zod'

export const getDetails = procedure
  .input(
    z.object({
      place_id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const data = await getBareDetailsAPI({ place_id: input.place_id })

    if (data.status === 'OK') {
      return data.result // returnRandomOne
    } else {
      throw new TRPCClientError(data.status)
    }
  })
