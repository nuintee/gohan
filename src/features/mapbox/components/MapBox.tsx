import Map, { GeolocateControl, GeolocateControlRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// config
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { mapStyles } from '../config'
import useMapBox from '../hooks'
import useToast from '@/libs/react-toastify'
import { useRef } from 'react'

// hooks
import useGetUserActivities from '@/features/activities/hooks/useGetUserActivities'
import { useSession } from 'next-auth/react'
import MarkerPin from './MarkerPin'
import useGPS from '@/hooks/gps'

const MapBox = () => {
  const geoLocateRef = useRef<GeolocateControlRef>(null)

  const { gps, updateSafeGeolocation } = useGPS()

  const { mapbox, setMapBoxRef, onActivityClicked, clearActivityFocus } = useMapBox()

  const { data: session } = useSession()
  const getUserAll = useGetUserActivities({ userId: session?.user.id as string })

  const handleLoad = () => {
    geoLocateRef?.current?.trigger()
  }

  const handleError = (error) => {
    console.dir(error)
    useToast.error(error.message)
  }

  const handleGeolocate = (e) => {
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
        mapStyle={mapStyles.MONOCHROME}
        renderWorldCopies={false}
        pitchWithRotate={false}
        onClick={() => clearActivityFocus()}
        onError={(e) => handleError(e.error)}
        onLoad={handleLoad}
        ref={setMapBoxRef}
      >
        <GeolocateControl
          showAccuracyCircle
          trackUserLocation
          showUserLocation
          showUserHeading
          position='bottom-right'
          onError={handleError}
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
