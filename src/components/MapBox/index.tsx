import React, { useEffect, useRef, useState } from 'react'
import Map, { GeolocateControl, Popup, Marker, Source, Layer } from 'react-map-gl'

// Constants
import { colors } from 'config/tailwind'

// Hooks
import { useToast } from '@/hooks/context'

// Config
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

const MapBox = (props) => {
  const mapRef = useRef(null)
  const [layers, setLayers] = useState([])
  const [geoData, setGeoData] = useState({})
  const { manageToast } = useToast()

  const onLoad = (e) => {}

  const onClick = (e) => {}

  return (
    <Map
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      mapboxAccessToken={mapboxAccessToken}
      ref={mapRef}
      onClick={onClick}
      onLoad={onLoad}
    >
      <GeolocateControl
        trackUserLocation={true}
        showUserHeading={true}
        showUserLocation={true}
        position={'bottom-right'}
      />
      <Marker longitude={100} latitude={40}>
        <div className='relative'>
          <div className='w-6 h-6 bg-gh-orange bg-opacity-75 rounded-full top-0 left-0 animate-ping'>
            {/* BG */}
          </div>
          <span className='h-4 w-4 bg-gh-orange rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md'></span>
        </div>
      </Marker>
      <Source id='route' type='geojson' data={geoData}>
        {layers.map((layer) => (
          <Layer {...layer} />
        ))}
      </Source>
    </Map>
  )
}

export default MapBox
