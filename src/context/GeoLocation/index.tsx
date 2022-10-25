import React, { useEffect, useState, createContext } from 'react'

// Types
import initialValues from '@/components/MapBox/constants'
import { MapBoxInit } from '@/components/MapBox/types'

const GeoLocationContext = createContext({
  geoState: initialValues.mapbox,
})

const GeoLocationProvider = ({ children }) => {
  const [geoState, setGeoState] = useState<MapBoxInit>(initialValues.mapbox)
  const value = {
    geoState,
  }

  useEffect(() => {
    const init = () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { coords } = pos
        const { latitude: lat, longitude: lng } = coords
        console.log({
          lng,
          lat,
        })
        setGeoState((prev) => ({
          ...prev,
          lat,
          lng,
        }))
      })
    }
    init()
  }, [])

  return <GeoLocationContext.Provider value={value}>{children}</GeoLocationContext.Provider>
}

const GeoLocation = {
  GeoLocationContext,
  GeoLocationProvider,
}

export default GeoLocation
