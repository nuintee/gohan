export type Coords = {
  latitude: number | null
  longitude: number | null
}

export const DEFAULT_DEV_COORDS: Coords = {
  latitude: 42.647803615748145,
  longitude: 23.405578430147724,
}

export const DEFAULT_COORDS: Coords = {
  latitude: null,
  longitude: null,
}
