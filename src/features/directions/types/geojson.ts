export type SourceType = {
  type: 'Feature'
  properties: {}
  geometry: {
    type: 'LineString'
    coordinates: number[][]
  }
}

export type LayerType = {
  id: string
  type: 'line'
  source: {
    type: 'geojson'
    data: SourceType
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

export type MapBoxDirections = {
  source: SourceType
  layer: LayerType
}
