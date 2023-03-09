const SORT_ENUM = {
  ASC: {
    label: '昇順',
    sortFn: (a, b, sortKey) => {
      if (a[sortKey] < b[sortKey]) {
        return -1
      }
      if (a[sortKey] > b.name) {
        return 1
      }
    },
  },
  DESC: {
    label: '降順',
    sortFn: (a, b, sortKey) => {
      if (a[sortKey] < b[sortKey]) {
        return 1
      }
      if (a[sortKey] > b.name) {
        return -1
      }
    },
  },
}

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
