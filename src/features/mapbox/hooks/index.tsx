import useDirections from '@/features/directions/hooks'
import { ViewState } from 'react-map-gl'
import { useRecoilState } from 'recoil'

// types
import { mapBoxState } from '../stores'

const useMapBox = () => {
  // const { hasDirections, get, set, directions } = useDirections()
  const [mapbox, setMapBox] = useRecoilState(mapBoxState)

  const updateCoords = (coords: GeolocationCoordinates) => {
    setMapBox((prev) => ({ ...prev, coords }))
    // update route if exists
    // if (!hasDirections) return
  }

  const updateViewState = (viewState: ViewState) => {
    setMapBox((prev) => ({ ...prev, viewState }))
  }

  return { updateCoords, updateViewState, state: mapbox }
}

export default useMapBox
