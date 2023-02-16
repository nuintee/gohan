import { ActivityResolved } from '@/features/activities/types'
import { useRef } from 'react'
import { MapRef, ViewState } from 'react-map-gl'
import { useRecoilState } from 'recoil'

// types
import { DefaultMapboxValues, mapBoxState } from '../stores'

const useMapBox = () => {
  const [mapbox, setMapBox] = useRecoilState(mapBoxState)

  const mapBoxRef = useRef<MapRef>(null)

  const updateSafeMapBox = (payload: Omit<DefaultMapboxValues, 'mapBoxRef'>) => {
    setMapBox((prev) => ({ ...prev, ...payload }))
  }

  const clearActivityFocus = () => {
    setMapBox((prev) => ({ ...prev, focusedPlaceId: '' }))
  }

  const onActivityClicked = (activity: ActivityResolved) => {
    updateSafeMapBox({ focusedPlaceId: activity.place_id })

    mapBoxRef.current?.flyTo({
      center: {
        lat: activity.geometry?.location?.lat,
        lng: activity.geometry?.location?.lng,
      },
      zoom: 17.5,
    })
  }

  return {
    mapbox,
    mapBoxRef,
    setMapBoxDangerous: setMapBox,
    updateSafeMapBox,
    onActivityClicked,
    clearActivityFocus,
  }
}

export default useMapBox
