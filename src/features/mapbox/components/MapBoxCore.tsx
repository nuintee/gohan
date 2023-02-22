import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { GeolocateControl, Map } from 'react-map-gl'
import { rest } from 'msw'
import { ReactElement } from 'react'
import useMapBox from '../hooks'

type Props = {
  mapProps: Omit<React.ComponentProps<typeof Map>, 'mapboxAccessToken' | 'mapStyle'>
  geolocateProps: React.ComponentProps<typeof GeolocateControl>
  children?: ReactElement
}

const MAP_PROPS_DEFAULT = {
  latitude: 90,
  longitude: 90,
  zoom: 15,
  renderWorldCopies: false,
  pitchWithRotate: false,
  dragPan: false,
  scrollZoom: false,
}

const GEOLOCATE_PROPS_DEFAULT: Props['geolocateProps'] = {
  showAccuracyCircle: true,
  trackUserLocation: true,
  showUserHeading: true,
  showUserLocation: true,
  position: 'bottom-right',
  style: {
    padding: '0.5rem',
    borderRadius: '100%',
  },
}

const MapBoxCore = ({
  mapProps = MAP_PROPS_DEFAULT,
  geolocateProps = GEOLOCATE_PROPS_DEFAULT,
  children,
}: Props) => {
  const { setMapBoxRef } = useMapBox()

  return (
    <Map
      {...mapProps}
      mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
      mapStyle='mapbox://styles/nuinteedev/cldaz8llv002c01mgt375yl40'
      ref={setMapBoxRef}
    >
      <GeolocateControl {...geolocateProps} />
      {children}
    </Map>
  )
}

export default MapBoxCore
