import React, { useEffect, useRef, useState } from 'react'
import Map, { GeolocateControl, Popup, Marker, Source, Layer } from 'react-map-gl'

// Constants
import { colors } from 'config/tailwind'

// Hooks
import { useGeoLocation, useModals, useToast } from '@/hooks/context'

// Config
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

const MapBox = (props) => {
  const { geoState, mapRef, sources, setSources } = useGeoLocation()
  const { manageToast } = useToast()

  const start_coords = [-66.96466, 44.8097]

  const onLoad = (e) => {}

  const onClick = (e) => {
    const coords = Object.keys(e.lngLat).map((key) => e.lngLat[key])
    console.dir(coords)

    const getRoute = async (start, end) => {
      try {
        // const base_coordinates = `-74.039865%2C40.713827%3B-74.038526%2C40.717775`
        const base_coordinates = encodeURIComponent(`${start};${end}`)
        console.log(base_coordinates)
        const profile = `mapbox/walking`
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/${profile}/${base_coordinates}?alternatives=true&geometries=geojson&language=en&overview=simplified&access_token=${mapboxAccessToken}`,
        )
        const json = await query.json()
        const routes = json?.routes
        const waypoints = json?.waypoints
        const endpoint = waypoints.map((waypoint) => waypoint.location)
        console.log({
          waypoints,
          endpoint,
        })
        const coordinates = routes?.map((route) => route.geometry.coordinates)
        console.log(coordinates)
        setSources((prev) => [
          ...prev,
          {
            id: 'base-route',
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates,
            },
            layers: [
              {
                id: 'b-start',
                type: 'line',
                source: 'base-route',
                paint: {
                  'line-color': '#4E3FC8',
                  'line-width': 2,
                },
              },
            ],
          },
          {
            id: 'end',
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [endpoint],
            },
            layers: [
              {
                id: 'b-end',
                type: 'circle',
                source: 'end',
                paint: {
                  'circle-color': '#4E3FC8',
                },
              },
            ],
          },
        ])
        return json
      } catch (error) {
        console.error(error)
        manageToast({
          isOpen: true,
          main: 'Error',
          mode: 'error',
          sub: error.message,
        })
      }
    }

    getRoute(start_coords, coords)
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
