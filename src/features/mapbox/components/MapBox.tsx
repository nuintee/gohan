import Map, { Source, Layer, GeolocateControl, useMap, GeolocateResultEvent } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// config
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { mapStyles } from '../config'
import useMapBox from '../hooks'
import useDirections from '@/features/directions/hooks'
import { useQueryClient } from '@tanstack/react-query'
import useToast from '@/libs/react-toastify'

const MapBox = ({}) => {
  const { updateViewState, updateCoords } = useMapBox()
  const { hasDirections, formattedDirections } = useDirections()

  return (
    <div className='w-screen h-screen'>
      <Map
        mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
        mapStyle={mapStyles.MONOCHROME}
        renderWorldCopies={false}
        pitchWithRotate={false}
        onMoveEnd={(e) => updateViewState(e.viewState)}
        onError={(e) => useToast.error(e.error.message)}
      >
        <GeolocateControl
          showAccuracyCircle
          trackUserLocation
          showUserLocation
          showUserHeading
          position='bottom-right'
          onGeolocate={(e) => updateCoords(e.coords)}
          onError={(e) => useToast.error(e.message)}
        />
        {hasDirections && (
          <Source type='geojson' data={formattedDirections.source}>
            <Layer {...formattedDirections?.layer} />
          </Source>
        )}
      </Map>
    </div>
  )
}

export default MapBox
