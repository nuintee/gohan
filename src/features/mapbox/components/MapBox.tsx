import { forwardRef, useState } from 'react'
import Map, {
  Source,
  Layer,
  GeolocateControl,
  useMap,
  GeolocateResultEvent,
  GeolocateControlRef,
  Marker,
  MapRef,
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
import { ActivityResolved } from '@/features/activities/types'
import { Close } from '@/components/icons'
import MarkerPin from './MarkerPin'
import { colors } from '@/config/colors'
import { useRecoilState } from 'recoil'
import { gpsState } from '@/stores/gps'

const MapBox = () => {
  const geoLocateRef = useRef<GeolocateControlRef>(null)
  const mapBoxRef = useRef<MapRef>(null)

  // Recoil
  const [gps, setGPS] = useRecoilState(gpsState)

  // local
  const [focusId, setFocusId] = useState('')

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

  const onClickItem = (activity: ActivityResolved) => {
    setFocusId(activity.place_id)

    mapBoxRef.current?.flyTo({
      center: {
        lat: activity.geometry?.location?.lat,
        lng: activity.geometry?.location?.lng,
      },
      zoom: 17.5,
    })
  }

  const clearFocus = () => {
    setFocusId('')
  }

  return (
    <div className='w-full h-full'>
      <Map
        initialViewState={{
          latitude: gps.coords.latitude ?? 0,
          longitude: gps.coords.longitude ?? 0,
          zoom: 16,
        }}
        mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
        mapStyle={mapStyles.MONOCHROME}
        renderWorldCopies={false}
        pitchWithRotate={false}
        onMoveEnd={(e) => updateViewState(e.viewState)}
        onClick={() => clearFocus()}
        onError={(e) => handleError(e.error)}
        onLoad={handleLoad}
        ref={mapBoxRef}
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
        {getUserAll.data?.map((activity) => (
          <MarkerPin
            latitude={activity.geometry?.location?.lat}
            longitude={activity.geometry?.location?.lng}
            focused={focusId === activity.place_id}
            onClick={() => onClickItem(activity)}
            data={activity}
            key={activity.place_id}
          />
        ))}
      </Map>
    </div>
  )
}

export default MapBox
