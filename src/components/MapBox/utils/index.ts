import { Directions, LayerType, SourceType } from '../types'

type MutableSource = {
  coordinates: number[][]
  id?: string | 'base-route'
  lineColor?: string
  lineWidth?: number
  lineOpacity?: number
}

const createSource = (payload: MutableSource): Directions => {
  const { coordinates, id, lineColor, lineWidth, lineOpacity } = payload

  const source: SourceType = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates,
    },
  }

  const layer: LayerType = {
    id: id || 'base-route',
    type: 'line',
    source: {
      type: 'geojson',
      data: source,
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': lineColor || 'orange',
      'line-width': lineWidth || 5,
      'line-opacity': lineOpacity || 0.75,
    },
  }

  return {
    source,
    layer,
  }
}
