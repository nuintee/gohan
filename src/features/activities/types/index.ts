// Response from DB
export type ActivityEntity<T = {}> = {
  id: string
  user_id: string
  place_id: string
  is_liked: boolean
  discovered_at: Date
} & T
