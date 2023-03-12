import { SORT_ENUM } from '@/constants/sort'

export function useSort<T extends unknown[]>({
  array,
  sortMethod,
  sortKey,
  disabled = false,
}: {
  array?: T
  sortMethod: 'ASC' | 'DESC'
  sortKey: string
  disabled: boolean
}) {
  if (!array) return []

  if (disabled) return array

  return array?.sort((a, b) => SORT_ENUM[sortMethod]?.sortFn(a, b, sortKey) || 1)
}
