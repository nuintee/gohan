import React from 'react'
import Map, { GeolocateControl } from 'react-map-gl'

const MapBox = () => {
  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger()
    }
  }, [])

  return (
    <Map
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
        position={'bottom-right'}
      />
    </Map>
  )
}

export default MapBox
