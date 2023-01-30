export type Id = {
  id: string | undefined
}

export type UserId = {
  user_id: string
}

export type ListFilter = {
  limit?: number
  offset?: number
}

export type MutateProps<T> = Id & T

export type ListProps<T extends Id | UserId> = T & ListFilter
