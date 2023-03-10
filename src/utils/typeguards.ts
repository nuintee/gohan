export function isObject<T extends Object>(value: unknown): value is T {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return true
}