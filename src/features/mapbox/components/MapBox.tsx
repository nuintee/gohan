import Map, { Source, Layer } from 'react-map-gl'

// config
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'

const MapBox = ({}) => {
  return (
    <div className='w-screen h-screen'>
      <Map
        mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        style={{ width: '100vw', height: '100vh' }}
        renderWorldCopies={false}
        pitchWithRotate={false}
      ></Map>
    </div>
  )
}

export default MapBox
