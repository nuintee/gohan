import { z } from 'zod'
import { procedure, router } from '../trpc'

// handlers
// import * as activities from './activities'
import * as activities from '@/features/activities/api'
import * as user from './user'
import * as directions from './directions'
import * as restaurants from './restaurants'

export const appRouter = router({
  ...activities,
  ...user,
  ...directions,
  ...restaurants,
})

export type AppRouter = typeof appRouter
