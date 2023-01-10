import { ResultsEntity } from '@/hooks/context/Restaurants/types'

export type RestaurantProps<T = {} | {}> = {
  mode: string
  place_id: string
  isLiked: boolean
  isLocked: boolean
  data: ResultsEntity
} & T
