import React, { useState, useRef, createContext, ReactNode } from 'react'

const GPSContext = createContext({
  initialPosition: {
    latitude: null,
    longitude: null,
  },
  isMoved: false,
  setInitialPosition: typeof useState,
  currentPosition: {
    latitude: null,
    longitude: null,
  },
  setCurerntPosition: typeof useState,
  setToDefaultGPS: Function,
})

const GPSProvider = (props) => {
  const { children } = props

  const [initialPosition, _setInitialPosition] = useState({
    latitude: null,
    longitude: null,
  })

  const [currentPosition, setCurerntPosition] = useState({
    latitude: null,
    longitude: null,
  })

  const isMoved = JSON.stringify(currentPosition) !== JSON.stringify(initialPosition)

  function setToDefaultGPS() {
    setCurerntPosition(initialPosition)
  }

  const calculateDistance = (endCoords: number[], startCoods: number[], unit?: 'km' | 'm') => {
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
          _setInitialPosition({ latitude, longitude })
          setCurerntPosition({ latitude, longitude })
        },
        (err) => console.log(err),
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
  }

  return <GPSContext.Provider value={value}>{children}</GPSContext.Provider>
}

const GPS = {
  GPSContext,
  GPSProvider,
}

export default GPS
