// import { useEffect, useState, useRef } from 'react'

// // Lib
// import mapboxgl from 'mapbox-gl'
// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

// // Constants
// import initialValues from './constants'

// // Hooks
// import useGeoLocation from '@/hooks/context/GeoLocation'

// const Map = () => {
//   const mapContainer = useRef(null)
//   const { geoState, mapRef } = useGeoLocation()

//   useEffect(() => {
//     if (mapRef.current) return // initialize map only once
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [geoState?.lng, geoState?.lat],
//       zoom: geoState?.zoom,
//       pitch: geoState?.pitch, // pitch in degrees
//       bearing: geoState?.bearing, // bearing in degrees
//     })

//     mapRef.current
//   }, [])

//   return (
//     <div
//       ref={mapContainer}
//       className='map-container h-screen bg-gradient-to-t from-white via-gh-l-gray to-gh-dark'
//     />
//   )
// }

import React from 'react'
import MapBox, { GeolocateControl } from 'react-map-gl'

const Map = () => {
  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger()
    }
  }, [])

  return (
    <MapBox
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN}
    >
      <GeolocateControl
        trackUserLocation={true}
        showUserHeading={true}
        showUserLocation={true}
        ref={geolocateControlRef}
      />
    </MapBox>
  )
}

export default Map
