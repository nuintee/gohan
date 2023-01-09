import useGPS from '@/hooks/context/GPS'
import React, { useState, useRef, createContext, ReactNode, useEffect } from 'react'

// constants
import { DEFAULT_COORDS } from '@/constants/coords'

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
})

const MapBoxProvider = (props) => {
  const { children } = props
  const { currentPosition } = useGPS()
  const mapBoxRef = useRef(null)
  const [mapBoxState, setMapBoxState] = useState(MAPBOX_DEFAULT)

  const isViewStateChanged = JSON.stringify(mapBoxState) !== JSON.stringify(MAPBOX_DEFAULT)

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      const _is_current_position_available =
        !!currentPosition.latitude && !!currentPosition.longitude

      if (!_is_current_position_available) return
      setMapBoxState((prev) => ({ ...prev, ...currentPosition }))
      await mapBoxRef.current?.flyTo({
        center: [currentPosition?.longitude, currentPosition?.latitude],
      })
      setIsReady(true)
    }

    init()
  }, [currentPosition])

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
  }

  return <MapBoxContext.Provider value={value}>{children}</MapBoxContext.Provider>
}

const MapBox = {
  MapBoxContext,
  MapBoxProvider,
}

export default MapBox
