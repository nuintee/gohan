import Map, {
  GeolocateControl,
  GeolocateControlRef,
  GeolocateErrorEvent,
  GeolocateResultEvent,
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// config
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { mapStyles } from '../config'
import useMapBox from '../hooks'
import useToast from '@/libs/react-toastify'
import { useRef } from 'react'

// hooks
import useGetUserActivities from '@/features/activities/hooks/useGetUserActivities'
import MarkerPin from './MarkerPin'
import useGPS from '@/hooks/gps'

const MapBox = () => {
  const geoLocateRef = useRef<GeolocateControlRef>(null)

  const { gps, updateSafeGeolocation } = useGPS()

  const { mapbox, setMapBoxRef, onActivityClicked, clearActivityFocus } = useMapBox()

  const getUserAll = useGetUserActivities()

  const handleLoad = () => {
    geoLocateRef?.current?.trigger()
  }

  function handleMapBoxError(e: mapboxgl.ErrorEvent) {
    useToast.error(e.error.message)
  }

  function handleGeolocateError(error: GeolocateErrorEvent) {
    if (error?.TIMEOUT === 3 && error?.code === 3) return

    switch (error.code) {
      case 1:
        useToast.error('位置情報を有効化して下さい。')
        break
      case 2:
        useToast.error('現在地の取得に失敗')
        break
      default:
        useToast.error(error.message)
        break
    }
  }

  const handleGeolocate = (e: GeolocateResultEvent) => {
    updateSafeGeolocation({
      coords: e.coords,
      isFetching: false,
    })
  }

  return (
    <div className='w-full h-full'>
      <Map
        initialViewState={{
          latitude: gps.coords.latitude,
          longitude: gps.coords.longitude,
          zoom: 16,
        }}
        mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
        mapStyle={mapStyles.PALE_BLUE}
        renderWorldCopies={false}
        pitchWithRotate={false}
        onClick={() => clearActivityFocus()}
        onError={handleMapBoxError}
        onLoad={handleLoad}
        ref={setMapBoxRef}
      >
        <GeolocateControl
          showAccuracyCircle
          trackUserLocation
          showUserLocation
          showUserHeading
          position='bottom-right'
          onError={handleGeolocateError}
          onGeolocate={handleGeolocate}
          style={{
            padding: '0.5rem',
            borderRadius: '100%',
          }}
          ref={geoLocateRef}
        />
        {getUserAll.data?.map((activity) => (
          <MarkerPin
            latitude={activity?.geometry?.location?.lat}
            longitude={activity?.geometry?.location?.lng}
            focused={mapbox.focusedPlaceId === activity.place_id}
            onClick={() => onActivityClicked(activity)}
            data={activity}
            key={activity.place_id}
          />
        ))}
      </Map>
    </div>
  )
}

export default MapBox
