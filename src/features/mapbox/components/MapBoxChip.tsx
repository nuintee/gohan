import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { forwardRef, ReactElement } from 'react'
import { GeolocateControl, Map, Marker, ViewState } from 'react-map-gl'
import useMapBox from '../hooks'
import Pin from './MarkerPin'

const MapBoxCore = forwardRef(
  ({
    latitude = 90,
    longitude = 90,
    zoom = 15,
    children,
    onClick,
    pitchWithRotate = false,
    dragPan = false,
    scrollZoom = false,
    trackUserLocation = true,
    onError,
    onGeolocate,
    ...rest
  }: Partial<ViewState> & {
    children?: ReactElement[] | ReactElement
    pitchWithRotate?: boolean
    dragPan?: boolean
    scrollZoom?: boolean
    trackUserLocation?: boolean
    onClick?: React.ComponentProps<typeof Map>['onClick']
    onLoad?: () => void
    onError?: React.ComponentProps<typeof GeolocateControl>['onError']
    onGeolocate?: React.ComponentProps<typeof GeolocateControl>['onGeolocate']
  }) => {
    const { setMapBoxRef } = useMapBox()

    return (
      <Map
        initialViewState={{
          latitude,
          longitude,
          zoom,
          ...rest,
        }}
        onClick={onClick}
        ref={setMapBoxRef}
        renderWorldCopies={false}
        pitchWithRotate={pitchWithRotate}
        dragPan={dragPan}
        scrollZoom={scrollZoom}
        mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
        mapStyle='mapbox://styles/nuinteedev/cldaz8llv002c01mgt375yl40'
      >
        <GeolocateControl
          showAccuracyCircle
          trackUserLocation={trackUserLocation}
          showUserLocation
          showUserHeading
          position='bottom-right'
          onError={onError}
          onGeolocate={onGeolocate}
          style={{
            padding: '0.5rem',
            borderRadius: '100%',
          }}
        />
        {children}
      </Map>
    )
  },
)

export default MapBoxCore
