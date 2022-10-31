import React, { useEffect, useState, createContext, useRef } from 'react'

// Hooks
import { useToast } from '@/hooks/context'

// Types
import initialValues from '@/components/MapBox/constants'
import { MapBoxInit } from '@/components/MapBox/types'

const GeoLocationContext = createContext({
  geoState: initialValues.mapbox,
  mapRef: {
    current: null,
  },
})

const GeoLocationProvider = ({ children }) => {
  const [geoState, setGeoState] = useState<MapBoxInit>(initialValues.mapbox)
  const { manageToast } = useToast()
  const mapRef = useRef(null)

  const value = {
    geoState,
    mapRef,
  }

  useEffect(() => {
    const init = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
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
            zoom: 18,
          }))
        },
        (error) => {
          manageToast({
            main: 'Erorr',
            sub: error.message,
            mode: 'error',
            onClose: () => {},
            isOpen: true,
            infinite: true,
          })
          setGeoState((prev) => ({
            ...prev,
            error: {
              is: true,
              message: error.message,
            },
          }))
        },
      )
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
