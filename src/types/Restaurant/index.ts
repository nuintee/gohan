export type RestaurantProps<T = {} | {}> = {
  place_id: string
  is_liked: boolean
} & T
