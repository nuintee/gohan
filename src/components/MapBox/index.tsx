import React, { useEffect, useRef, useState } from 'react'
import { CurrentPostion } from '@/icons'
import { type FC } from 'react'
import Map, { GeolocateControl, Popup, Marker, Source, Layer } from 'react-map-gl'
import { useMapBox } from '@/hooks/context'
import useGPS from '@/hooks/context/GPS'
import { CurrentLocationMarker, DestinationMarker } from './components'
import { DEV_GEO_JSON, DEV_LAYER, DEV_ROUTES, DEV_TARGET_COORDS } from './data'
import useRestaurantSearch from '@/hooks/API/restaurant'

// utils
import { createSource } from './utils'

// Config
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

export type MapBoxProps = {}

const MapBox: FC<MapBoxProps> = (props) => {
  const { mapBoxRef, setMapBoxState, mapBoxState, isReady } = useMapBox()
  const { currentPosition } = useGPS()
  const { getRoute } = useRestaurantSearch()

  const [_directions, _setDirection] = useState({
    source: DEV_GEO_JSON,
    layer: DEV_LAYER,
  })

  const onClick = async (e) => {
    const { lngLat } = e
    const { lat: latitude, lng: longitude } = lngLat

    const coords = {
      latitude,
      longitude,
    }

    // GetRoute
    const { coordinates } = await getRoute({
      profileType: 'walking',
      start: currentPosition,
      end: coords,
    })

    const source = createSource({ coordinates })

    _setDirection((prev) => source)
  }
  const onLoad = () => {}

  if (!isReady) {
    return (
      <div className='h-screen w-screen bg-gh-dark flex items-center justify-center text-white'>
        Loading map
      </div>
    )
  }

  return (
    <div className='w-screen h-screen'>
      <Map
        onMove={(e) => setMapBoxState((prev) => ({ ...prev, ...e.viewState }))}
        initialViewState={mapBoxState}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        mapboxAccessToken={mapboxAccessToken}
        ref={mapBoxRef}
        onLoad={onLoad}
        onClick={onClick}
        renderWorldCopies={false}
      >
        <CurrentLocationMarker coords={currentPosition} />
        <DestinationMarker coords={DEV_TARGET_COORDS} />

        <Source data={_directions.source} type='geojson'>
          <Layer {..._directions.layer} />
        </Source>

        {/* {isLocationReady && (
          <Marker longitude={geoState.lng} latitude={geoState.lat}>
            <div className='relative'>
              <div className='w-8 h-8 bg-white bg-opacity-75 rounded-full top-0 left-0 animate-ping'></div>
              <span className='h-6 w-6 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md flex items-center justify-center'>
                <CurrentPostion width={12} height={12} />
              </span>
            </div>
          </Marker>
        )}
        {destination.length ? (
          <Marker longitude={destination[0]} latitude={destination[1]}>
            <div className='relative'>
              <div className='w-8 h-8 bg-gh-orange bg-opacity-75 rounded-full top-0 left-0 animate-ping'></div>
              <span className='h-6 w-6 bg-gh-orange rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md'></span>
            </div>
          </Marker>
        ) : (
          <></>
        )}
        {sources?.map((source) => (
          <Source id={source.id} type='geojson' data={source}>
            {source.layers.map((layer) => (
              <Layer {...layer} />
            ))}
          </Source>
        ))} */}
      </Map>
    </div>
  )
}

export default MapBox
