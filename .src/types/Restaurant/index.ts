import { ResultsEntity } from '@/hooks/context/Restaurants/types'

export type RestaurantProps<T = {} | {}> = {
  mode?: 'small' | 'large'
  isLiked: boolean
  isLocked: boolean
  distance?: string | null
  data?: ResultsEntity
} & T
