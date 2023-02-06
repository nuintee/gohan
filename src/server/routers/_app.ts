import { z } from 'zod'
import { procedure, router } from '../trpc'

// handlers
import { getActivity } from './activies/getActivity'
import { getUserActivities } from './activies/getUserActivities'
import { getUser } from './user/getUser'
import { updateUser } from './user/updateUser'

export const appRouter = router({
  getActivity,
  getUserActivities,
  getUser,
  updateUser,
})

export type AppRouter = typeof appRouter
