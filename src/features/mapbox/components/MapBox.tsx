import Map, { Source, Layer, GeolocateControl, useMap } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// config
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { mapStyles } from '../config'
import useMapBox from '../hooks'

const MapBox = ({}) => {
  const { updateViewState, updateCoords } = useMapBox()

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
      </Map>
    </div>
  )
}

export default MapBox
