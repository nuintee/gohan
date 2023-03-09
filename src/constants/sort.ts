export const SORT_ENUM = {
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
