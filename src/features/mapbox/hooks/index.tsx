import useDirections from '@/features/directions/hooks'
import { ViewState } from 'react-map-gl'
import { useRecoilState } from 'recoil'

// types
import { mapBoxState } from '../stores'

const useMapBox = () => {
  const [mapbox, setMapBox] = useRecoilState(mapBoxState)
  const { coords, viewState } = mapbox

  const updateCoords = (coords: GeolocationCoordinates) => {
    setMapBox((prev) => ({ ...prev, coords }))
  }

  const updateViewState = (viewState: ViewState) => {
    setMapBox((prev) => ({ ...prev, viewState }))
  }

  const coordAsArray = (coords: Pick<GeolocationCoordinates, 'latitude' | 'longitude'>) => {
    return [coords.latitude, coords.longitude]
  }

  const coordAsString = (coords: Pick<GeolocationCoordinates, 'latitude' | 'longitude'>) => {
    return `${coords.latitude},${coords.longitude}`
  }

  return {
    updateCoords,
    updateViewState,
    state: mapbox,
    coords,
    viewState,
    coordAsString,
    coordAsArray,
  }
}

export default useMapBox
