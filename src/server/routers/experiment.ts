import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'
import { sleep } from '@/utils/sleep'
import { z } from 'zod'
import { procedure } from '../trpc'

export const getExperiment = procedure.input(z.null()).query(async (q) => {
  await sleep(1000 * 5)

  return Math.random()
})
