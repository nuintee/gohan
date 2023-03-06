import { getBareDetailsAPI } from '@/features/restaurants/utils/getBareDetailsAPI'
import { statusMapper } from '@/features/restaurants/utils/statusMapper'
import { procedure } from '@/server/trpc'
import { TRPCClientError } from '@trpc/client'
import { z } from 'zod'
import { getBareImageAPI } from '../hooks/getBareImageAPI'

export const getDetails = procedure
  .input(
    z.object({
      place_id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const data = await getBareDetailsAPI({ place_id: input.place_id })

    if (data.status === 'OK') {
      return data.result
    } else {
      throw new TRPCClientError(statusMapper(data.status), { cause: new Error(data.status) })
    }
  })

export const getImage = procedure
  .input(
    z.object({
      photo_reference: z.string(),
    }),
  )
  .query(async ({ input }) => {
    return getBareImageAPI(input.photo_reference)
  })
