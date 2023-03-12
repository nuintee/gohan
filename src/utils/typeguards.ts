export function isObject<T extends Object>(value: unknown): value is T {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return true
}

export function isString(value: unknown): value is string {
  if (typeof value !== 'string' || value === null) {
    return false
  }

  return true
}

export function isNumber(value: unknown): value is number {
  if (typeof value !== 'number' || value === null) {
    return false
  }

  return true
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}
