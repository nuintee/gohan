import React, { useState } from 'react'

import { useGeoLocation } from '@/hooks/context'

// Config
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

// Hooks
import { useToast } from '@/hooks/context'

const useDirections = () => {
  const [isFindingRoute, setIsFindingRouting] = useState(false)
  const { manageToast } = useToast()
  const { setSources } = useGeoLocation()

  const onError = (error) => {
    manageToast({
      isOpen: true,
      main: 'Error',
      mode: 'error',
      sub: error.message,
    })
  }

  const onSuccess = ({ coordinates, endpoint }) => {
    setSources((prev) => [
      // ToHook
      ...prev,
      {
        id: 'base-route',
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates,
        },
        layers: [
          {
            id: 'b-start',
            type: 'line',
            source: 'base-route',
            paint: {
              'line-color': '#4E3FC8',
              'line-width': 2,
            },
          },
        ],
      },
      {
        id: 'end',
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [endpoint],
        },
        layers: [
          {
            id: 'b-end',
            type: 'circle',
            source: 'end',
            paint: {
              'circle-color': '#4E3FC8',
            },
          },
        ],
      },
    ])
  }

  const getRoute = async ({ profileType, start, end }) => {
    try {
      const base_coordinates = encodeURIComponent(`${start};${end}`)
      const profile = `mapbox/${profileType || 'walking'}`
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/${profile}/${base_coordinates}?alternatives=true&geometries=geojson&language=en&overview=simplified&access_token=${mapboxAccessToken}`,
      )
      const json = await query.json()
      const routes = json?.routes
      const waypoints = json?.waypoints
      const coordinates = routes?.map((route) => route.geometry.coordinates)
      const endpoint = waypoints.map((waypoint) => waypoint.location)
      onSuccess({ coordinates, endpoint })
    } catch (error) {
      console.error(error)
      onError(error)
    }
  }

  return { onError, onSuccess, getRoute, isFindingRoute, setIsFindingRouting }
}

export default useDirections
