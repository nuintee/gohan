import { z } from 'zod'
import { procedure, router } from '../trpc'

// handlers
import * as activities from './activities'
import * as user from './user'
import * as directions from './directions'

export const appRouter = router({
  ...activities,
  ...user,
  ...directions,
})

export type AppRouter = typeof appRouter
