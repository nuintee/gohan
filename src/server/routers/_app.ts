import { router } from '../trpc'

// handlers
import { getActivity } from './activies/getActivity'
import { getUserActivities } from './activies/getUserActivities'

export const appRouter = router({
  getActivity,
  getUserActivities,
})

export type AppRouter = typeof appRouter
