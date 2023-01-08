import React, { useState, useRef, createContext, ReactNode } from 'react'

const GPSContext = createContext({})

const GPSProvider = (props) => {
  const { children } = props

  const value = {}

  return <GPSContext.Provider value={value}>{children}</GPSContext.Provider>
}

const GPS = {
  GPSContext,
  GPSProvider,
}

export default GPS
