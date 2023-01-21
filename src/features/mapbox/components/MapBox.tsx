import Map, { Source, Layer, GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// config
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'

const MapBox = ({}) => {
  return (
    <div className='w-screen h-screen'>
      <Map
        mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        renderWorldCopies={false}
        pitchWithRotate={false}
      >
        <GeolocateControl
          showAccuracyCircle
          trackUserLocation
          showUserLocation
          showUserHeading
          position='bottom-right'
        />
      </Map>
    </div>
  )
}

export default MapBox
