import { ResultsEntity } from '@/hooks/context/Restaurants/types'

export type RestaurantProps<T = {} | {}> = {
  mode?: 'small' | 'large'
  place_id: string
  isLiked: boolean
  isLocked: boolean
  data: ResultsEntity
} & T
