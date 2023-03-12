import { isString, isNumber, isObject } from '@/utils/typeguards'

type ObjectType = Record<string, string>

export type SORT_METHODS = keyof typeof SORT_ENUM

function sortASCFn<T>(a: T, b: T, sortKey: string) {
  if ((isString(a) || isNumber(a)) && (isString(b) || isNumber(b))) {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
  } else if (isObject(a) && isObject(b)) {
    if ((a as ObjectType)[sortKey] < (b as ObjectType)[sortKey]) {
      return -1
    }
    if ((a as ObjectType)[sortKey] > (b as ObjectType)[sortKey]) {
      return 1
    }
  }
}
function sortDESCFn<T>(a: T, b: T, sortKey: string) {
  if ((isString(a) || isNumber(a)) && (isString(b) || isNumber(b))) {
    if (a < b) {
      return 1
    }
    if (a > b) {
      return -1
    }
  } else if (isObject(a) && isObject(b)) {
    if ((a as ObjectType)[sortKey] < (b as ObjectType)[sortKey]) {
      return 1
    }
    if ((a as ObjectType)[sortKey] > (b as ObjectType)[sortKey]) {
      return -1
    }
  }
}

export const SORT_ENUM = {
  ASC: {
    label: '昇順',
    sortFn: sortASCFn,
  },
  DESC: {
    label: '降順',
    sortFn: sortDESCFn,
  },
}
