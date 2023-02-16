import { ViewState } from 'react-map-gl'
import { useRecoilState } from 'recoil'

// types
import { DefaultMapboxValues, mapBoxState } from '../stores'

const useMapBox = () => {
  const [mapbox, setMapBox] = useRecoilState(mapBoxState)

  const updateSafeMapBox = (payload: Omit<DefaultMapboxValues, 'mapBoxRef'>) => {
    setMapBox((prev) => ({ ...prev, ...payload }))
  }

  return { mapbox, mapboxRef: mapbox.mapBoxRef, setMapBoxDangerous: setMapBox, updateSafeMapBox }
}

export default useMapBox
