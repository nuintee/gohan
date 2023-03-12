import { SORT_ENUM } from '@/constants/sort'

export function useSort({
  array,
  sortMethod,
  sortKey,
  disabled = false,
}: {
  array: Object[]
  sortMethod: 'ASC' | 'DESC'
  sortKey: keyof Object
  disabled: boolean
}) {
  if (disabled) return array

  return array?.sort((a, b) => SORT_ENUM[sortMethod]?.sortFn(a, b, sortKey) || 1)
}
