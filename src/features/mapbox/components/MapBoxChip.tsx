import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { Map, Marker, ViewState } from 'react-map-gl'

const MapBoxCore = ({ latitude = 90, longitude = 90, zoom = 15, ...rest }: Partial<ViewState>) => {
  return (
    <Map
      initialViewState={{
        latitude,
        longitude,
        zoom,
        ...rest,
      }}
      renderWorldCopies={false}
      pitchWithRotate={false}
      dragPan={false}
      scrollZoom={false}
      mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
      mapStyle='mapbox://styles/nuinteedev/cldaz8llv002c01mgt375yl40'
    >
      <Marker latitude={latitude} longitude={longitude} />
    </Map>
  )
}

export default MapBoxCore
