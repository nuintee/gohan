import React, { useEffect, useState, createContext, useRef } from 'react'

// Config
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

// Hooks
import { useToast } from '@/hooks/context'

// Types
import initialValues from '@/components/MapBox/constants'
import { MapBoxInit } from '@/components/MapBox/types'

type Coords = {
  lat: number
  lng: number
}

const GeoLocationContext = createContext({
  geoState: initialValues.mapbox,
  mapboxAccessToken,
  mapRef: {
    current: null,
  },
  flyTo: () => {},
})

const GeoLocationProvider = ({ children }) => {
  const [geoState, setGeoState] = useState<MapBoxInit>(initialValues.mapbox)
  const [sources, setSources] = useState([])
  const { manageToast } = useToast()
  const mapRef = useRef(null)

  const flyTo = (coords: Coords) => {
    console.log(coords)
    mapRef.current.flyTo({
      center: [
        coords?.lng || (Math.random() - 0.5) * 90,
        coords?.lat || (Math.random() - 0.5) * 90,
      ],
      zoom: 15,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    })
  }

  const value = {
    geoState,
    mapRef,
    sources,
    mapboxAccessToken,
    setSources,
    flyTo,
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
