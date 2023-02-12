import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'
import { z } from 'zod'
import { procedure } from '../trpc'

export const getExperiment = procedure
  .input(
    z.object({
      a: z.number(),
      b: z.number(),
    }),
  )
  .query(async ({ input }) => {
    if (IS_DEVMODE) {
      return input.a + input.b
    } else if (IS_PRODMODE) {
    } else {
      // test
    }
  })

export const getExperimentWithMutation = procedure
  .input(
    z.object({
      a: z.number(),
      b: z.number(),
    }),
  )
  .mutation(async ({ input }) => {
    if (IS_DEVMODE) {
      return input.a + input.b
    } else if (IS_PRODMODE) {
    } else {
      // test
    }
  })
