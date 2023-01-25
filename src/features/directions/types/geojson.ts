export type Source = {
  type: 'Feature'
  properties: {}
  geometry: {
    type: 'LineString'
    coordinates: number[][]
  }
}

export type Layer = {
  id: string
  type: 'line'
  source: {
    type: 'geojson'
    data: Source
  }
  layout: {
    'line-join': 'round'
    'line-cap': 'round'
  }
  paint: {
    'line-color': string
    'line-width': number
    'line-opacity': number
  }
}

export type GeoJSON = {
  source: Source | {}
  layer: Layer | {}
}

export type GeoJSONCreatorProps = {
  coordinates: number[][]
  id?: string
  lineColor?: string
  lineWidth?: number
  lineOpacity?: number
}
