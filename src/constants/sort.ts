export const SORT_ENUM = {
  ASC: {
    label: '昇順',
    sortFn: <T extends Object, K extends keyof T>(a: T, b: T, sortKey: K) => {
      if (a[sortKey] < b[sortKey]) {
        return -1
      }
      if (a[sortKey] > b[sortKey]) {
        return 1
      }
    },
  },
  DESC: {
    label: '降順',
    sortFn: <T extends Object, K extends keyof T>(a: T, b: T, sortKey: K) => {
      if (a[sortKey] < b[sortKey]) {
        return 1
      }
      if (a[sortKey] > b[sortKey]) {
        return -1
      }
    },
  },
}
