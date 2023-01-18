import useGPS from '@/hooks/context/GPS'
import React, { useState, useRef, createContext, ReactNode, useEffect } from 'react'

// constants
import { Coords, DEFAULT_COORDS } from '@/constants/coords'
import { Directions } from '@/components/MapBox/types'

// Hooks
import useRestaurantSearch from '@/hooks/API/restaurant'

// Utils
import { createSource } from '@/components/MapBox/utils'
import { MapRef } from 'react-map-gl'

const MAPBOX_DEFAULT = {
  moveOnClick: false,
  ...DEFAULT_COORDS,
  zoom: 17,
  bearing: null,
  padding: null,
}

const MapBoxContext = createContext({
  mapBoxRef: {
    current: null,
  },
  mapBoxState: MAPBOX_DEFAULT,
  setMapBoxState: typeof useState,
  isViewStateChanged: false,
  MAPBOX_DEFAULT,
  setToDefaultViewState: typeof Function,
  isReady: false,
  directions: {},
  isNavigating: false,
  locateUser: () => {},
  drawRoute: async (coords: Coords, place_id?: string | null): Promise<void> => {},
  clearRoute: () => {},
  getDestinationCoords: (): Coords | {} => {
    return {}
  },
})

const MapBoxProvider = (props) => {
  const { children } = props

  // Refs
  const mapBoxRef = useRef<MapRef>(null)

  // useStates
  const [mapBoxState, setMapBoxState] = useState(MAPBOX_DEFAULT)
  const [directions, setDirections] = useState<Directions | {}>({})
  const [isReady, setIsReady] = useState(false)

  // Custom Hooks
  const { getRoute } = useRestaurantSearch()
  const { currentPosition, isPositionAvailable } = useGPS()

  // Flags
  const isNavigating =
    !!directions &&
    directions?.hasOwnProperty('source') &&
    directions?.hasOwnProperty('layer') &&
    Object.keys(directions).length > 0

  const isViewStateChanged = JSON.stringify(mapBoxState) !== JSON.stringify(MAPBOX_DEFAULT)

  // Functions
  async function locateUser() {
    if (!isPositionAvailable) return
    mapBoxRef.current?.flyTo({
      center: [currentPosition.longitude as number, currentPosition.latitude as number], // if isPositionAvailable, positions should not be null
    })
  }

  async function drawRoute(coords: Coords, place_id?: string | null): Promise<void> {
    try {
      const { coordinates } = await getRoute({
        profileType: 'walking',
        start: currentPosition,
        end: coords,
        _dev: {
          place_id,
        },
      })
      const source = createSource({ coordinates })
      setDirections(source)
    } catch (error) {
      console.error(error)
    }
  }

  function clearRoute() {
    setDirections({})
  }

  function setToDefaultViewState() {
    setMapBoxState(MAPBOX_DEFAULT)
  }

  function getDestinationCoords() {
    if (!isNavigating) return {}
    const destinationCoords = directions.source.geometry.coordinates
    const destinationCurosor = destinationCoords[destinationCoords.length - 1]
    const destination = isNavigating && {
      latitude: destinationCurosor[1],
      longitude: destinationCurosor[0],
    }
    return destination
  }

  useEffect(() => {
    const init = async () => {
      if (!isPositionAvailable) return
      setMapBoxState((prev) => ({ ...prev, ...currentPosition }))
      await locateUser()
      setIsReady(true)
    }

    init()
  }, [isPositionAvailable])

  const value = {
    mapBoxRef,
    mapBoxState,
    setMapBoxState,
    MAPBOX_DEFAULT,
    isViewStateChanged,
    setToDefaultViewState,
    isReady,
    locateUser,
    isNavigating,
    drawRoute,
    clearRoute,
    directions,
    getDestinationCoords,
  }

  return <MapBoxContext.Provider value={value}>{children}</MapBoxContext.Provider>
}

const MapBox = {
  MapBoxContext,
  MapBoxProvider,
}

export default MapBox
