export type ConditionsWithALL<T extends string> = T | 'ALL'

export function useFilter<T>({
  array,
  filterFn,
  disabled = false,
}: {
  array: T[]
  filterFn: (_v: T) => boolean
  disabled: boolean
}) {
  if (disabled) return array

  return array?.filter(filterFn)
}
