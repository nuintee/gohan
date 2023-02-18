import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { z } from 'zod'
import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'
import { randomUUID } from 'crypto'

import { AddActivitySchema, UpdateActivitySchema } from '../schemas/index.schema'

// utils
import { sleep } from '@/utils/sleep'

// data
import { details as detailsData } from '@/data/details'
import { TRPCError } from '@trpc/server'
import {
  DetailsAPI,
  PlacesDetailsStatus,
  PLACES_RESPONSE_STATUS,
} from '@/features/restaurants/types'

export const getActivity = procedure
  .input(
    z.object({
      userId: z.optional(z.string()),
      place_id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    if (IS_DEVMODE) {
      let data

      if (input.userId) {
        // Get activity when authed
        data = await prisma.activity.findUnique({
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

      return { ...data, ...detailedResponse.result }
    } else if (IS_PRODMODE) {
      // Google API
    } else {
      // test
    }
  })

export const deleteActivity = procedure
  .input(
    z.object({
      activityId: z.optional(z.string()),
      place_id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    if (IS_DEVMODE) {
      // mock
      // const data = await prisma.activity.delete({
      //   where: {
      //     id: input.activityId,
      //   },
      // })
      // return data
      const data = await prisma.activity.delete({
        where: {
          userId_place_id: {
            userId: ctx.session?.user.id,
            place_id: input.place_id,
          },
        },
      })
      return data
    } else if (IS_PRODMODE) {
      // Google API
    } else {
      // test
    }
  })

export const updateActivity = procedure
  .input(UpdateActivitySchema)
  .mutation(async ({ input, ctx }) => {
    const { payload } = input
    if (IS_DEVMODE) {
      const data = await prisma.activity.upsert({
        where: {
          userId_place_id: {
            userId: ctx.session?.user.id,
            place_id: payload.place_id,
          },
        },
        create: {
          discovered_at: new Date(),
          userId: ctx.session?.user.id,
          place_id: payload.place_id,
          reviewStatus: payload.reviewStatus,
          memo: payload.memo || '',
        },
        update: {
          memo: payload.memo,
          reviewStatus: payload.reviewStatus,
        },
      })
      return data
    } else if (IS_PRODMODE) {
      // Google API
    } else {
      // test
    }
  })

export const addActivity = procedure.input(AddActivitySchema).mutation(async ({ input }) => {
  const {
    activityId = randomUUID(),
    userId,
    place_id = '',
    memo = '',
    reviewStatus = 'NEW',
  } = input

  if (IS_DEVMODE) {
    const data = await prisma.activity.create({
      data: {
        id: activityId,
        place_id,
        memo,
        reviewStatus,
        userId,
        discovered_at: new Date(),
      },
    })
    return data
  } else if (IS_PRODMODE) {
  } else {
  }
})

export const getUserActivities = procedure
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    if (IS_DEVMODE) {
      const data = await prisma.activity.findMany({ where: { userId: input.userId } })

      // get details
      const details = await Promise.all(
        data.map(async (activity) => {
          await sleep(500)
          return { ...activity, ...detailsData.result(activity.place_id) }
        }),
      )

      return details
    } else if (IS_PRODMODE) {
      // Google API
    } else {
      // test
    }
  })
