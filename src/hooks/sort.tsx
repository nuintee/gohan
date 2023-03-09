export function useSort({
  array,
  sortMethod,
  sortKey,
}: {
  array: unknown[]
  sortMethod: 'ASC' | 'DEC'
  sortKey: unknown
}) {
  function ASC(a, b) {
    if (a[sortKey] < b[sortKey]) {
      return -1
    }
    if (a[sortKey] > b.name) {
      return 1
    }
  }

  function DEC(a, b) {
    if (a[sortKey] < b[sortKey]) {
      return 1
    }
    if (a[sortKey] > b.name) {
      return -1
    }
  }

  return array?.sort(sortMethod === 'ASC' ? ASC : DEC)
}
