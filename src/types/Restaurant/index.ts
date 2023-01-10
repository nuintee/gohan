import { ResultsEntity } from '@/hooks/context/Restaurants/types'

export type RestaurantProps<T = {} | {}> = {
  mode: string
  place_id: string
  is_liked: boolean
  is_locked: boolean
  data: ResultsEntity
} & T
