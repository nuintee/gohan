import React, { useEffect, useRef, useState } from 'react'
import Map, { GeolocateControl, Popup, Marker, Source, Layer } from 'react-map-gl'

// Constants
import { colors } from 'config/tailwind'

// Hooks
import { useGeoLocation, useModals, useToast } from '@/hooks/context'
import useDirections from './hooks/Directions'

// Config
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

const MapBox = (props) => {
  const { mapRef, sources, geoState } = useGeoLocation()
  const { getRoute, isFindingRoute, setIsFindingRouting } = useDirections()

  const start_coords = [-66.96466, 44.8097]

  const onLoad = (e) => {}

  const onClick = async (e) => {
    const coords = Object.keys(e.lngLat).map((key) => e.lngLat[key])
    console.dir(coords)
    setIsFindingRouting(true)
    await getRoute({
      start: [geoState.lng, geoState.lat],
      end: coords,
    })
    setIsFindingRouting(false)
  }

  return (
    <div className='w-screen h-screen'>
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
        renderWorldCopies={false}
      >
        <GeolocateControl
          trackUserLocation={true}
          showUserHeading={true}
          showUserLocation={true}
          position={'bottom-right'}
        />
        <Marker longitude={100} latitude={40}>
          <div className='relative'>
            <div className='w-6 h-6 bg-gh-orange bg-opacity-75 rounded-full top-0 left-0 animate-ping'></div>
            <span className='h-4 w-4 bg-gh-orange rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md'></span>
          </div>
        </Marker>
        {sources?.map((source) => (
          <Source id={source.id} type='geojson' data={source}>
            {source.layers.map((layer) => (
              <Layer {...layer} />
            ))}
          </Source>
        ))}
      </Map>
    </div>
  )
}

export default MapBox
