import Map, {
  Source,
  Layer,
  GeolocateControl,
  useMap,
  GeolocateResultEvent,
  GeolocateControlRef,
  Marker,
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// config
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import { mapStyles } from '../config'
import useMapBox from '../hooks'
import { useQueryClient } from '@tanstack/react-query'
import useToast from '@/libs/react-toastify'
import { useRef } from 'react'

// hooks
import useGetUserActivities from '@/features/activities/hooks/useGetUserActivities'
import { useSession } from 'next-auth/react'

const MapBox = () => {
  const geoLocateRef = useRef<GeolocateControlRef>(null)

  const { data: session } = useSession()
  const getUserAll = useGetUserActivities({ userId: session?.user.id as string })

  const { updateViewState, updateCoords, updateIsLoadingUserLocation, isLoadingUserLocation } =
    useMapBox()

  const handleLoad = () => {
    updateIsLoadingUserLocation(true)
    geoLocateRef?.current?.trigger()
  }

  const handleError = (error) => {
    useToast.error(error.message)

    if (isLoadingUserLocation) {
      updateIsLoadingUserLocation(false)
    }
  }

  return (
    <div className='w-screen h-screen'>
      <Map
        mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
        mapStyle={mapStyles.MONOCHROME}
        renderWorldCopies={false}
        pitchWithRotate={false}
        onMoveEnd={(e) => updateViewState(e.viewState)}
        onError={(e) => handleError(e.error)}
        onLoad={handleLoad}
      >
        <GeolocateControl
          showAccuracyCircle
          trackUserLocation
          showUserLocation
          showUserHeading
          position='bottom-right'
          onGeolocate={(e) => updateCoords(e.coords)}
          onError={handleError}
          style={{
            padding: '0.5rem',
            borderRadius: '100%',
          }}
          ref={geoLocateRef}
        />
        {getUserAll?.data?.map((activity) => (
          <Marker />
        ))}
      </Map>
    </div>
  )
}

export default MapBox
