import { ResultsEntity } from '@/features/restaurants/types'
import { Activity } from '@prisma/client'

export type ActivityResolved = Activity & ResultsEntity
