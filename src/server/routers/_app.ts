import { router } from '../trpc'

// handlers
import * as activities from '@/features/activities/api'
import * as user from '@/features/user/api'
import * as directions from '@/features/directions/api'
import * as restaurants from '@/features/restaurants/api'
import * as experiments from './experiment'

export const appRouter = router({
  ...activities,
  ...user,
  ...directions,
  ...restaurants,
  ...experiments,
})

export type AppRouter = typeof appRouter
