import { useEffect, useState, useRef } from 'react'

// Lib
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

// Constants
import initialValues from './constants'

const Map = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [mapBoxState, setMapBoxState] = useState(initialValues.mapbox)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mapBoxState.lng, mapBoxState.lat],
      zoom: mapBoxState.zoom,
      pitch: 60, // pitch in degrees
      bearing: -60, // bearing in degrees
    })
  })

  return <div ref={mapContainer} className='map-container h-screen bg-gh-l-gray' />
}

export default Map
