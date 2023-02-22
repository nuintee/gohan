import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { ReactElement } from 'react'
import { GeolocateControl, Map, Marker, ViewState } from 'react-map-gl'
import useMapBox from '../hooks'
import Pin from './MarkerPin'

const MapBoxCore = ({
  latitude = 90,
  longitude = 90,
  zoom = 15,
  children,
  ...rest
}: Partial<ViewState> & { children?: ReactElement }) => {
  const { setMapBoxRef } = useMapBox()

  return (
    <Map
      initialViewState={{
        latitude,
        longitude,
        zoom,
        ...rest,
      }}
      ref={setMapBoxRef}
      renderWorldCopies={false}
      pitchWithRotate={false}
      dragPan={false}
      scrollZoom={false}
      mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
      mapStyle='mapbox://styles/nuinteedev/cldaz8llv002c01mgt375yl40'
    >
      <GeolocateControl
        showAccuracyCircle
        trackUserLocation
        showUserLocation
        showUserHeading
        position='bottom-right'
        onError={() => {}}
        onGeolocate={() => {}}
        style={{
          padding: '0.5rem',
          borderRadius: '100%',
        }}
      />
      {children}
    </Map>
  )
}

export default MapBoxCore
