import React, { useState, useRef, createContext, ReactNode } from 'react'

// constants
import { DEFAULT_COORDS, DEFAULT_DEV_COORDS } from '@/constants/coords'

const GPSContext = createContext({
  initialPosition: DEFAULT_COORDS,
  isMoved: false,
  setInitialPosition: typeof useState,
  currentPosition: DEFAULT_COORDS,
  setCurerntPosition: typeof useState,
  setToDefaultGPS: Function,
  isPositionAvailable: false,
  calculateDistance: (endCoords: number[], startCoods: number[], unit?: 'km' | 'm') => {},
})

const GPSProvider = (props) => {
  const { children } = props

  // States
  const [initialPosition, _setInitialPosition] = useState(DEFAULT_COORDS)
  const [currentPosition, setCurerntPosition] = useState(DEFAULT_COORDS)

  const isMoved = JSON.stringify(currentPosition) !== JSON.stringify(initialPosition)
  const isPositionAvailable = !!currentPosition.latitude && !!currentPosition.longitude

  function setToDefaultGPS() {
    setCurerntPosition(initialPosition)
  }

  function calculateDistance(endCoords: number[], startCoods: number[], unit?: 'km' | 'm') {
    const _calculated =
      Math.sqrt(
        Math.pow(endCoords[0] - startCoods[0], 2) + Math.pow(endCoords[1] - startCoods[1], 2),
      ) * 100
    return {
      raw: _calculated,
      km: `${Math.round(_calculated * 1000) / 1000}${unit && 'km'}`,
      m: `${Math.round(_calculated * 1000)}${unit && 'm'}`,
    }
  }

  useState(() => {
    const init = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          const coords =
            process.env.NODE_ENV === 'production' ? { latitude, longitude } : DEFAULT_DEV_COORDS

          _setInitialPosition(coords)
          setCurerntPosition(coords)
        },
        (err) => console.log(err),
        {
          maximumAge: 60000,
          timeout: 5000,
          enableHighAccuracy: true,
        },
      )
    }
    init()
  }, [])

  const value = {
    initialPosition,
    currentPosition,
    setCurerntPosition,
    setToDefaultGPS,
    calculateDistance,
    isMoved,
    isPositionAvailable,
  }

  return <GPSContext.Provider value={value}>{children}</GPSContext.Provider>
}

const GPS = {
  GPSContext,
  GPSProvider,
}

export default GPS
