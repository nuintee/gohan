// Types
import { GeoJSON, GeoJSONCreatorProps } from '../types/geojson'
import { Source, Layer } from '../types/geojson'
import axios from '@/libs/axios'

import { Props, Schema } from '../schema/getDirections.schema'

// Env
import { BASE_URL } from '@/config/env'
const BASE_KEY = 'directions'

// Functions
import useToast from '@/libs/react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DirectionsAPI } from '../types/api'

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

  const get = (props: Pick<Partial<Props>, 'start'> & Omit<Props, 'start'>) => {
    const { start, end } = props

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
    return useMutation(
      async () => {
        queryClient.setQueryData([BASE_KEY], () => ({}))
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([BASE_KEY])
        },
        onError: (error) => {
          return useToast.error(error.message)
        },
      },
    )
  }

  const directions = queryClient.getQueryData<DirectionsAPI>([BASE_KEY])
  const hasDirections = Boolean(directions && directions?.routes?.length > 0)
  const formattedDirections = hasDirections
    ? _createGeoJSON({ coordinates: directions?.routes[0].geometry.coordinates })
    : {}

  return { get, revoke, directions, hasDirections, formattedDirections }
}

export default useDirections
