import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { z } from 'zod'

// Env
import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'

// Schema
import { CoordinatesSchema } from '../schema/getDirections.schema'

export const getDirections = procedure
  .input(z.array(CoordinatesSchema).max(2))
  .query(async ({ input }) => {
    const [a, b] = input

    if (IS_DEVMODE) {
      // mock as msw
      return {
        a,
        b,
      }
    } else if (IS_PRODMODE) {
      return {
        a,
        b,
      }
    } else {
      // test
      return {
        a,
        b,
      }
    }
  })
