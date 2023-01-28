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
const BASE_KEY = 'directions'

// Functions
import useToast from '@/libs/react-toastify'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useMapBox from '@/features/mapbox/hooks'

const useDirections = () => {
  const queryClient = useQueryClient()

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

  const get = (props: Props) => {
    const { start, end, profileType } = props

    return useQuery({
      queryKey: [BASE_KEY],
      queryFn: () => {
        return axios
          .get(`${BASE_URL}/api/v1/directions?start=${start}&end=${end}`)
          .then((res) => res.data)
      },
      enabled: false,
      onError: (error) => {
        return useToast.error(error.message)
      },
    })
  }

  const revoke = () => {
    queryClient.setQueryData([BASE_KEY], () => {
      return {}
    })
  }

  const drawRoute = () => {}

  const clearRoute = () => {}

  const directions = queryClient.getQueryData([BASE_KEY])

  return { get, revoke, directions }
}

export default useDirections
