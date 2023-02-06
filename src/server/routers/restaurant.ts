import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { z } from 'zod'
import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'

export const getRestaurant = procedure
  .input(
    z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  )
  .query(async ({ input }) => {
    if (IS_DEVMODE) {
      // mock
    } else if (IS_PRODMODE) {
      // Google API
    } else {
      // test
    }
  })

export const getRestaurantDetails = procedure
  .input(
    z.object({
      place_id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    if (IS_DEVMODE) {
      // mock
    } else if (IS_PRODMODE) {
      // Google API
    } else {
      // test
    }
  })
