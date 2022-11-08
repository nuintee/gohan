import React, { useState } from 'react'

import { useGeoLocation, useModals } from '@/hooks/context'

// Constants
import { colors } from 'config/tailwind'

// Config
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

// Hooks
import { useToast } from '@/hooks/context'

// Types
type Source = {
  id: string
  geometry: {
    type: 'MultiLineString' | 'Polygon'
    coordinates: number[]
  }
}

type Layer = {
  id: string
  type: 'line' | 'circle'
  paint?: {
    'line-color'?: string
    'line-width'?: number
    'circle-color'?: string
    'circle-radius'?: {
      base: number
      stops?: number[][]
    }
  }
}

type Data = {
  source: Source
  layer: Layer
}

const useDirections = () => {
  const { manageToast } = useToast()
  const { manageModal } = useModals()
  const { setSources, isFindingRoute, setIsFindingRouting, setDestination } = useGeoLocation()

  const addSource = (payload: Data) => {
    const { source, layer } = payload

    const data = {
      id: source.id,
      type: 'Feature',
      geometry: source.geometry,
      layers: [
        {
          id: layer.id,
          type: layer.type,
          source: source.id,
          paint: layer.paint,
        },
      ],
    }
    return data
  }

  const onError = (error) => {
    manageToast({
      isOpen: true,
      main: 'Error',
      mode: 'error',
      sub: error.message,
    })
  }

  const onSuccess = ({ coordinates, endpoint }) => {
    const route = addSource({
      source: {
        id: 'base-route',
        geometry: {
          type: 'MultiLineString',
          coordinates,
        },
      },
      layer: {
        id: 'start',
        type: 'line',
        paint: {
          'line-color': colors['gh-orange'],
          'line-width': 2,
        },
      },
    })

    const end = addSource({
      source: {
        id: 'base-end',
        geometry: {
          type: 'Polygon',
          coordinates: [endpoint],
        },
      },
      layer: {
        id: 'end',
        type: 'circle',
        paint: {
          'circle-color': colors['gh-orange'],
          'circle-radius': {
            base: 10,
            stops: [
              [9, 9],
              [9, 9],
            ],
          },
        },
      },
    })

    setSources((prev) => [route])
  }

  const getRoute = async ({ profileType, start, end }) => {
    try {
      setIsFindingRouting(true)
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
      setIsFindingRouting(false)
    } catch (error) {
      console.error(error)
      onError(error)
    }
  }

  const clearRouting = (persistModal) => {
    setDestination([])
    setSources([])
    setShopDetail({})
    manageModal('details', persistModal)
  }

  return {
    onError,
    onSuccess,
    getRoute,
    isFindingRoute,
    setIsFindingRouting,
    clearRouting,
  }
}

export default useDirections
