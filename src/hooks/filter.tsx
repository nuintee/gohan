export function useFilter({
  array,
  filterFn,
}: {
  array: unknown[]
  filterFn: (_v: unknown) => unknown[]
}) {
  return array?.filter(filterFn)
}
