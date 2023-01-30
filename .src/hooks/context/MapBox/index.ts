import React, { useContext } from 'react'
import { MapBox } from '@/context/'

const useMapBox = () => {
  return useContext(MapBox.MapBoxContext)
}

export default useMapBox
