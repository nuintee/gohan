export function useFilter({
  array,
  filterFn,
  disabled = false,
}: {
  array: unknown[]
  filterFn: (_v: unknown) => unknown[]
  disabled: boolean
}) {
  if (disabled) return array

  return array?.filter(filterFn)
}
