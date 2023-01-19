import React, { useContext } from 'react'
import { GPS } from '@/context/'

const useGPS = () => {
  return useContext(GPS.GPSContext)
}

export default useGPS
