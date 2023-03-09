import { SORT_ENUM } from '@/constants/sort'

export function useSort({
  array,
  sortMethod,
  sortKey,
  disabled = false,
}: {
  array: unknown[]
  sortMethod: 'ASC' | 'DESC'
  sortKey: unknown
  disabled: boolean
}) {
  if (disabled) return array

  return array?.sort((a, b) => SORT_ENUM[sortMethod]?.sortFn(a, b, sortKey))
}
