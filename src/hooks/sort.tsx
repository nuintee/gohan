const SORT_ENUM = {
  ASC: {
    label: '昇順',
    sortFn: (a, b, sortKey) => {
      console.log('ASC')
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
      console.log('DESC')
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
}: {
  array: unknown[]
  sortMethod: 'ASC' | 'DESC'
  sortKey: unknown
}) {
  return array?.sort((a, b) => SORT_ENUM[sortMethod]?.sortFn(a, b, sortKey))
}
