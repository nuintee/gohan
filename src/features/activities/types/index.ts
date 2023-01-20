import { Activity } from '@prisma/client'

// Response from DB
export type ActivityEntity<T = {}> = Activity & T
