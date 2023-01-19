import Map, { Source, Layer } from 'react-map-gl'

// config
import { MAPBOX_TOKEN } from '../config/env'

const MapBox = ({}) => {
  return (
    <div className='w-screen h-screen'>
      {/* <Map
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
      </Map> */}
      <Map mapboxAccessToken={MAPBOX_TOKEN}></Map>
    </div>
  )
}

export default MapBox
