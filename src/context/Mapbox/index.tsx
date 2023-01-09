import useGPS from '@/hooks/context/GPS'
import React, { useState, useRef, createContext, ReactNode } from 'react'

const MAPBOX_DEFAULT = {
  moveOnClick: false,
  longitude: -100,
  latitude: 40,
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
})

const MapBoxProvider = (props) => {
  const { children } = props
  const { currentPosition } = useGPS()
  const mapBoxRef = useRef()
  const [mapBoxState, setMapBoxState] = useState(MAPBOX_DEFAULT)

  const isViewStateChanged = JSON.stringify(mapBoxState) !== JSON.stringify(MAPBOX_DEFAULT)

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
  }

  return <MapBoxContext.Provider value={value}>{children}</MapBoxContext.Provider>
}

const MapBox = {
  MapBoxContext,
  MapBoxProvider,
}

export default MapBox
