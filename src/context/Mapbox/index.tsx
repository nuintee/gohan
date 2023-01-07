import React, { useState, useRef, createContext, ReactNode } from 'react'

const MapBoxContext = createContext({
  mapBoxRef: {
    current: null,
  },
  mapBoxState: {
    moveOnClick: false,
    longitude: -100,
    latitude: 40,
    zoom: 17,
  },
  setMapBoxState: typeof useState,
})

const MapBoxProvider = (props) => {
  const { children } = props
  const mapBoxRef = useRef()
  const [mapBoxState, setMapBoxState] = useState({
    // Add Initial Values
    moveOnClick: false,
    longitude: -100,
    latitude: 40,
    zoom: 17,
  })

  const value = {
    mapBoxRef,
    mapBoxState,
    setMapBoxState,
  }

  return <MapBoxContext.Provider value={value}>{children}</MapBoxContext.Provider>
}

const MapBox = {
  MapBoxContext,
  MapBoxProvider,
}

export default MapBox
