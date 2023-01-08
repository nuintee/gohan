import React, { useState, useRef, createContext, ReactNode } from 'react'

const GPSContext = createContext({
  initialPosition: {
    latitude: undefined,
  },
  setInitialPosition: typeof useState,
  currentPosition: {},
  setCurerntPosition: typeof useState,
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
    isMoved,
  }

  return <GPSContext.Provider value={value}>{children}</GPSContext.Provider>
}

const GPS = {
  GPSContext,
  GPSProvider,
}

export default GPS
