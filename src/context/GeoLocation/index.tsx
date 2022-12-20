import React, { useEffect, useState, createContext, useRef } from 'react'

// Config
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

// Hooks
import { useToast } from '@/hooks/context'

// Types
import initialValues from '@/components/MapBox/constants'
import { MapBoxInit } from '@/components/MapBox/types'
import { Coords } from '@/types/GeoLocation/index.types'

// Consts
import GEOLOCATION from '@/constants/GeoLocation'

const GeoLocationContext = createContext({
  geoState: initialValues.mapbox,
  mapboxAccessToken,
  destination: [],
  isFindingRoute: false,
  setDestination: () => {},
  mapRef: {
    current: null,
  },
  flyTo: () => {},
  calculateDistance: () => {},
  setIsFindingRouting: () => {},
  setShopDetail: () => {},
})

const GeoLocationProvider = ({ children }) => {
  const [geoState, setGeoState] = useState<MapBoxInit>(initialValues.mapbox)
  const [isFindingRoute, setIsFindingRouting] = useState(false)
  const [sources, setSources] = useState([])
  const [destination, setDestination] = useState([])
  const [shopDetail, setShopDetail] = useState({})
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

  const calculateDistance = (endCoords, startCoods) => {
    return (
      Math.sqrt(
        Math.pow(endCoords?.lat - startCoods?.lat, 2) +
          Math.pow(endCoords?.lng - startCoods?.lng, 2),
      ) * 100
    )
  }

  const value = {
    geoState,
    mapRef,
    sources,
    mapboxAccessToken,
    destination,
    isFindingRoute,
    shopDetail,
    setShopDetail,
    setIsFindingRouting,
    setDestination,
    setSources,
    flyTo,
    calculateDistance,
  }

  useEffect(() => {
    const init = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { coords } = pos
          const { latitude: lat, longitude: lng, ...rest } = coords

          setGeoState((prev) => ({
            ...prev,
            ...(process.env.NODE_ENV === 'production'
              ? { lat, lng }
              : GEOLOCATION.DEFAULT_LOCATION),
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
        {
          enableHighAccuracy: true,
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
