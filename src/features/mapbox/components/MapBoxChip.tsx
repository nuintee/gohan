import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { CSSProperties, forwardRef, ReactElement } from 'react'
import { GeolocateControl, Map, ViewState } from 'react-map-gl'
import { mapStyles } from '../config'
import useMapBox from '../hooks'

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
    style,
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
    style: CSSProperties
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
        mapStyle={mapStyles.PALE_BLUE}
        style={style}
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
