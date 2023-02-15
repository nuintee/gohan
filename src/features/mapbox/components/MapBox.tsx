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

const Pin = ({
  latitude,
  longitude,
  focused = false,
}: {
  latitude?: number
  longitude?: number
  focused?: boolean
}) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      {/* <MarkerPin icon={<Close />} circleColor={colors['gh-l-green']} /> */}
      <div
        className='h-14 w-14 bg-white flex items-center justify-center rounded-full p-1 duration-700 ease-in-out'
        style={{
          ...(focused && { scale: '1.5' }),
        }}
      >
        <span className='bg-gh-l-gray w-full aspect-square rounded-full flex items-center justify-center text-xl'>
          😄
        </span>
      </div>
    </Marker>
  )
}

const MapBox = () => {
  const geoLocateRef = useRef<GeolocateControlRef>(null)
  const mapBoxRef = useRef<MapRef>(null)

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
      zoom: 16,
    })
  }

  return (
    <div className='w-full h-full'>
      <div className='flex gap-2'>
        {getUserAll.data?.map((v) => (
          <button onClick={() => onClickItem(v)}>{v.name}</button>
        ))}
      </div>
      <Map
        mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
        mapStyle={mapStyles.MONOCHROME}
        renderWorldCopies={false}
        pitchWithRotate={false}
        onMoveEnd={(e) => updateViewState(e.viewState)}
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
          // <Marker
          //   latitude={activity.geometry?.location?.lat}
          //   longitude={activity.geometry?.location?.lng}
          // />
          <Pin
            latitude={activity.geometry?.location?.lat}
            longitude={activity.geometry?.location?.lng}
            focused={focusId === activity.place_id}
          />
        ))}
      </Map>
    </div>
  )
}

export default MapBox
