// Stores
import { directionsState } from '../stores'
import { useRecoilState } from 'recoil'

// Types
import { GeoJSON, GeoJSONCreatorProps } from '../types/geojson'
import { Source, Layer } from '../types/geojson'
import axios from '@/libs/axios'

// Schemas
import { ZodError } from 'zod'
import { Props, Schema } from '../schema/getDirections.schema'

// Env
import { BASE_URL } from '@/config/env'

// Functions
import useToast from '@/libs/react-toastify'

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

  const get = async (props: Props) => {
    try {
      const { profileType, start, end } = Schema.parse(props)

      const url = new URL(`${BASE_URL}/api/v1/directions`)
      profileType && url.searchParams.append('profileType', profileType as string)
      url.searchParams.append('start', start)
      url.searchParams.append('end', end)

      const options = {
        headers:
          (props?.place_id && {
            'x-place-id': props?.place_id,
          }) ||
          {},
      }
      const { data } = await axios.get(url.toString(), options)
      return data
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
        useToast.info('Invalid Parameters')
      } else {
        useToast.error(error.message)
      }
    }
  }

  const set = (coordinates: number[][]) => {
    const geojson = _createGeoJSON({ coordinates })
    setDirections(geojson)
  }

  const clear = () => {
    setDirections((prev) => ({ source: {}, layer: {} }))
  }

  return { hasDirections, set, clear, get }
}

export default useDirections
