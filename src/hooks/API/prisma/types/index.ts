export type Id<T = {}> = {
  id: string | undefined
} & T

export type UserId = {
  user_id: string
}
