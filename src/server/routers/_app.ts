import { router } from '../trpc'

// handlers
import * as activities from '@/features/activities/api'
import * as user from '@/features/user/api'
import * as directions from '@/features/directions/api'
import * as restaurants from '@/features/restaurants/api'

export const appRouter = router({
  ...activities,
  ...user,
  ...directions,
  ...restaurants,
})

export type AppRouter = typeof appRouter
