import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'
import { PlacesDetailsStatus, DetailsAPI } from '@/features/restaurants/types'
import { procedure } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { details as detailsData } from '@/data/details'
import { USER_ID_SCHEMA } from '@/features/user/schema/index.schema'

export const getActivity = procedure
  .input(
    z.object({
      userId: z.optional(USER_ID_SCHEMA),
      place_id: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    if (IS_DEVMODE) {
      let data

      if (input.userId) {
        // Get activity when authed

        data = await ctx.prisma.activity.findUnique({
          where: {
            userId_place_id: {
              userId: input.userId,
              place_id: input.place_id,
            },
          },
        })
      }

      const detailsResult = detailsData.result(input?.place_id)

      const detailsResponse = (): PlacesDetailsStatus => {
        if (!detailsResult) {
          return 'ZERO_RESULTS'
        } else {
          return 'OK'
        }
      }

      const detailsErrorMessage = (status: PlacesDetailsStatus) => {
        switch (status) {
          case 'ZERO_RESULTS':
            return '該当するデータが見つかりませんでした。'
          case 'OVER_QUERY_LIMIT':
            return 'API通信回数制限を超えました。'
          case 'REQUEST_DENIED':
            return 'リクエストが拒否されました。'
          case 'UNKNOWN_ERROR':
            return '予期しないエラーが発生しました。'
          case 'INVALID_REQUEST':
            return '無効なリクエストです。'
          default:
            return ''
        }
      }

      const detailedResponse: DetailsAPI = {
        ...detailsData,
        result: detailsResult || {},
        status: detailsResponse(),
      }

      if (detailedResponse.status !== 'OK') {
        // throw TRPC Error
        throw new TRPCError({
          code: 'BAD_REQUEST',
          cause: detailedResponse.status,
          message: detailsErrorMessage(detailedResponse.status),
        })
      }

      const result = { ...data, ...detailedResponse.result }

      if (!result || !Object.keys(result).length) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          cause: detailedResponse.status,
          message: detailsErrorMessage('ZERO_RESULTS'),
        })
      }

      return result
    } else if (IS_PRODMODE) {
      // Google API
    } else {
      // test
    }
  })
