// Stores
import { directionsState } from '../stores'
import { useRecoilState } from 'recoil'

// Types
import { GeoJSON, GeoJSONCreatorProps } from '../types/geojson'
import { Source, Layer } from '../types/geojson'

const useDirections = () => {
  const [directions, setDirections] = useRecoilState(directionsState)

  const hasDirections = Boolean(directions?.source && Object.keys(directions?.source).length > 0)

  const _createGeoJSON = (payload: GeoJSONCreatorProps): GeoJSON => {
    const { coordinates, id, lineColor, lineWidth, lineOpacity } = payload

    const source: Source = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates,
      },
    }

    const layer: Layer = {
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

  const set = () => {
    const geojson = _createGeoJSON({
      coordinates: [
        [0, 0],
        [2, 2],
      ],
    })
    setDirections(geojson)
  }

  const clear = () => {
    setDirections((prev) => ({ source: {}, layer: {} }))
  }

  return { hasDirections, set, clear }
}

export default useDirections
