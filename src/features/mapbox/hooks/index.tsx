import useDirections from '@/features/directions/hooks'
import { ViewState } from 'react-map-gl'
import { useRecoilState } from 'recoil'

// types
import { mapBoxState } from '../stores'

const useMapBox = () => {
  const [mapbox, setMapBox] = useRecoilState(mapBoxState)

  const updateCoords = (coords: GeolocationCoordinates) => {
    setMapBox((prev) => ({ ...prev, coords }))
  }

  const updateViewState = (viewState: ViewState) => {
    setMapBox((prev) => ({ ...prev, viewState }))
  }

  return { updateCoords, updateViewState, state: mapbox }
}

export default useMapBox
