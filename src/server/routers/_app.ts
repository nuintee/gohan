import { router } from '../trpc'

// handlers
import * as activities from '@/features/activities/api'
import * as user from '@/features/user/api'
import * as restaurants from '@/features/restaurants/api'
import * as details from '@/features/details/api'
import * as report from '@/features/report/api'

export const appRouter = router({
  ...activities,
  ...user,
  ...restaurants,
  ...details,
  ...report,
})

export type AppRouter = typeof appRouter
