import Map, {
  Source,
  Layer,
  GeolocateControl,
  useMap,
  GeolocateResultEvent,
  GeolocateControlRef,
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// config
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { mapStyles } from '../config'
import useMapBox from '../hooks'
// import useDirections from '@/features/directions/hooks'
import { useQueryClient } from '@tanstack/react-query'
import useToast from '@/libs/react-toastify'
import { useRef } from 'react'

const MapBox = ({}) => {
  const geoLocateRef = useRef<GeolocateControlRef>(null)
  const { updateViewState, updateCoords, updateIsLoadingUserLocation, isLoadingUserLocation } =
    useMapBox()
  // const { hasDirections, formattedDirections } = useDirections()

  const handleLoad = () => {
    updateIsLoadingUserLocation(true)
    geoLocateRef?.current?.trigger()
  }

  const handleError = (error) => {
    useToast.error(error.message)

    if (isLoadingUserLocation) {
      updateIsLoadingUserLocation(false)
    }
  }

  return (
    <div className='w-screen h-screen'>
      <Map
        mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
        mapStyle={mapStyles.MONOCHROME}
        renderWorldCopies={false}
        pitchWithRotate={false}
        onMoveEnd={(e) => updateViewState(e.viewState)}
        onError={(e) => handleError(e.error)}
        onLoad={handleLoad}
      >
        <GeolocateControl
          showAccuracyCircle
          trackUserLocation
          showUserLocation
          showUserHeading
          position='bottom-right'
          onGeolocate={(e) => updateCoords(e.coords)}
          onError={handleError}
          style={{
            padding: '0.5rem',
            borderRadius: '100%',
          }}
          ref={geoLocateRef}
        />
        {/* {hasDirections && (
          <Source type='geojson' data={formattedDirections.source}>
            <Layer {...formattedDirections?.layer} />
          </Source>
        )} */}
      </Map>
    </div>
  )
}

export default MapBox
