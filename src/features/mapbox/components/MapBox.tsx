import Map, { Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// config
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'

const MapBox = ({}) => {
  return (
    // <div className='w-screen h-screen'>
    //   <Map
    //     mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
    //     mapStyle='mapbox://styles/mapbox/streets-v11'
    //     style={{ width: '100vw', height: '100vh' }}
    //     renderWorldCopies={false}
    //     pitchWithRotate={false}
    //   ></Map>
    // </div>
    <div className='bg-red-200 h-full w-full'>1</div>
  )
}

export default MapBox
