import { isArray, isObject } from '@/utils/typeguards'

export type ConditionsWithALL<T extends string> = T | 'ALL'

export function withAll<T>(arg: T) {
  if (isObject(arg)) {
    return { ...arg, ALL: 'ALL' }
  } else if (isArray(arg)) {
    return [...arg, 'ALL']
  }
}

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
