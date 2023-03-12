import { ActivityResolved } from '@/features/activities/types'
import { ResultsEntity } from '@/features/restaurants/types'
import { useRecoilState } from 'recoil'

// types
import { DefaultMapboxValues, mapBoxRefAtom, mapBoxState } from '../stores'

const useMapBox = () => {
  const [mapbox, setMapBox] = useRecoilState(mapBoxState)
  const [mapBoxRef, setMapBoxRef] = useRecoilState(mapBoxRefAtom)

  const updateSafeMapBox = (payload: Omit<DefaultMapboxValues, 'mapBoxRef'>) => {
    setMapBox((prev) => ({ ...prev, ...payload }))
  }

  const clearActivityFocus = () => {
    setMapBox((prev) => ({ ...prev, focusedPlaceId: '' }))
  }

  const onActivityClicked = (activity?: ResultsEntity) => {
    if (!activity) return

    updateSafeMapBox({ focusedPlaceId: activity.place_id || '' })

    if (activity.geometry?.location?.lat && activity.geometry?.location?.lng) {
      mapBoxRef?.flyTo({
        center: {
          lat: activity.geometry?.location?.lat,
          lng: activity.geometry?.location?.lng,
        },
        zoom: 17.5,
      })
    }
  }

  return {
    mapbox,
    mapBoxRef,
    setMapBoxRef,
    setMapBoxDangerous: setMapBox,
    updateSafeMapBox,
    onActivityClicked,
    clearActivityFocus,
  }
}

export default useMapBox
