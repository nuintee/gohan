import Map, { Source, Layer, GeolocateControl, useMap } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// config
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { mapStyles } from '../config'
import useMapBox from '../hooks'
import useDirections from '@/features/directions/hooks'
import { useQueryClient } from '@tanstack/react-query'

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
      >
        <GeolocateControl
          showAccuracyCircle
          trackUserLocation
          showUserLocation
          showUserHeading
          position='bottom-right'
          onGeolocate={(e) => updateCoords(e.coords)}
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
