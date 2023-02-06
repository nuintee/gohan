import { z } from 'zod'
import { procedure, router } from '../trpc'

// handlers
import { getActivity, getUserActivities } from './activities'
import { getUser, updateUser } from './user'
import { getDirections } from './directions'

export const appRouter = router({
  getActivity,
  getUserActivities,
  getUser,
  updateUser,
  getDirections,
})

export type AppRouter = typeof appRouter
