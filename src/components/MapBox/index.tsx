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
  const [sources, setSources] = useState([
    {
      id: 'route',
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [100, 40],
            [-66.96466, 44.8097],
          ],
        ],
      },
      layers: [
        {
          id: 'start',
          type: 'circle',
          source: 'route',
          paint: {
            'circle-color': '#4E3FC8',
          },
        },
      ],
    },
    {
      id: 'path',
      type: 'Feature',
      geometry: {
        type: 'MultiLineString',
        coordinates: [
          [
            [100, 40],
            [100, 50],
            [100, 60],
            [-66.96466, 44.8097],
          ],
        ],
      },
      layers: [
        {
          id: 'p',
          type: 'line',
          source: 'path',
          paint: {
            'line-color': '#15cc09',
            'line-width': 2,
          },
        },
      ],
    },
  ])
  const { manageToast } = useToast()

  const start = [100, 40]

  const onLoad = (e) => {}

  const onClick = (e) => {
    const coords = Object.keys(e.lngLat).map((key) => e.lngLat[key])
  }

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
      {/* <Source id='route' type='geojson' data={geoData}>
        {layers.map((layer) => (
          <Layer {...layer} />
        ))}
      </Source> */}
      {sources?.map((source) => (
        <Source id={source.id} type='geojson' data={source}>
          {source.layers.map((layer) => (
            <Layer {...layer} />
          ))}
        </Source>
      ))}
    </Map>
  )
}

export default MapBox
