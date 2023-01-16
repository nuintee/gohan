import React, { useEffect } from 'react'
import { type FC } from 'react'
import Map, { Source, Layer } from 'react-map-gl'
import { useMapBox } from '@/hooks/context'
import useGPS from '@/hooks/context/GPS'
import { CurrentLocationMarker, DestinationMarker } from './components'

// Config
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

export type MapBoxProps = {}

const MapBox: FC<MapBoxProps> = (props) => {
  const {
    mapBoxRef,
    setMapBoxState,
    mapBoxState,
    isReady,
    directions,
    isNavigating,
    drawRoute,
    clearRoute,
    getDestinationCoords,
  } = useMapBox()
  const { currentPosition } = useGPS()

  const onClick = async (e) => {
    const { lngLat } = e
    const { lat: latitude, lng: longitude } = lngLat

    const coords = {
      latitude,
      longitude,
    }

    if (mapBoxState.moveOnClick) {
      drawRoute(coords)
    } else {
      clearRoute()
    }
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
        pitchWithRotate={false}
      >
        <CurrentLocationMarker coords={currentPosition} />

        {isNavigating && (
          <>
            <DestinationMarker coords={getDestinationCoords()} />
            <Source data={directions.source} type='geojson'>
              <Layer {...directions.layer} />
            </Source>
          </>
        )}
      </Map>
    </div>
  )
}

export default MapBox
