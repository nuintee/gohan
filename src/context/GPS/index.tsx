import React, { useState, useRef, createContext, ReactNode } from 'react'

const GPSContext = createContext({})

const GPSProvider = (props) => {
  const { children } = props

  const [initialPosition, setInitialPosition] = useState({})
  const [currentPosition, setCurerntPosition] = useState({})

  const value = {
    initialPosition,
    setInitialPosition,
    currentPosition,
    setCurerntPosition,
  }

  return <GPSContext.Provider value={value}>{children}</GPSContext.Provider>
}

const GPS = {
  GPSContext,
  GPSProvider,
}

export default GPS
