import React, { useEffect, useState, createContext } from 'react'

const GeoLocationContext = createContext({})

const GeoLocationProvider = ({ children }) => {
  const [geoState, setGeoState] = useState({})
  const value = {}

  return <GeoLocationContext.Provider value={}>{children}</GeoLocationContext.Provider>
}
