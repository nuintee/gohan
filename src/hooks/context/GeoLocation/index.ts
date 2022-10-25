import React, { useContext } from 'react'
import { GeoLocation } from '@/context'

const useGeoLocation = () => {
  return useContext(GeoLocation.GeoLocationContext)
}

export default useGeoLocation
