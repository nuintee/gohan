import useGPS from '@/hooks/context/GPS'
import React, { useState, useRef, createContext, ReactNode, useEffect } from 'react'

// constants
import { Coords, DEFAULT_COORDS } from '@/constants/coords'
import { Directions } from '@/components/MapBox/types'

// Hooks
import useRestaurantSearch from '@/hooks/API/restaurant'

// Utils
import { createSource } from '@/components/MapBox/utils'

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
  drawRoute: (coords: Coords) => {},
  clearRoute: () => {},
})

const MapBoxProvider = (props) => {
  const { children } = props
  const { currentPosition, isPositionAvailable } = useGPS()
  const mapBoxRef = useRef(null)
  const [mapBoxState, setMapBoxState] = useState(MAPBOX_DEFAULT)
  const [directions, setDirections] = useState<Directions | {}>({})
  const [isReady, setIsReady] = useState(false)
  const { getRoute } = useRestaurantSearch()

  const isNavigating = !!Object.keys(directions)?.length
  const isViewStateChanged = JSON.stringify(mapBoxState) !== JSON.stringify(MAPBOX_DEFAULT)

  const locateUser = async () => {
    await mapBoxRef.current?.flyTo({
      center: [currentPosition?.longitude, currentPosition?.latitude],
    })
  }

  async function drawRoute(coords: Coords) {
    try {
      const { coordinates } = await getRoute({
        profileType: 'walking',
        start: currentPosition,
        end: coords,
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

  useEffect(() => {
    const init = async () => {
      if (!isPositionAvailable) return
      setMapBoxState((prev) => ({ ...prev, ...currentPosition }))
      await locateUser()
      setIsReady(true)
    }

    init()
  }, [isPositionAvailable])

  const setToDefaultViewState = () => {
    setMapBoxState(MAPBOX_DEFAULT)
  }

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
  }

  return <MapBoxContext.Provider value={value}>{children}</MapBoxContext.Provider>
}

const MapBox = {
  MapBoxContext,
  MapBoxProvider,
}

export default MapBox
