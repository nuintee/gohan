import useDirections from '@/features/directions/hooks'
import { ViewState } from 'react-map-gl'
import { useRecoilState } from 'recoil'

// types
import { mapBoxState } from '../stores'

const useMapBox = () => {
  const [mapbox, setMapBox] = useRecoilState(mapBoxState)
  const { coords, viewState, isLoadingUserLocation } = mapbox

  function coordAsArray(coords: Pick<GeolocationCoordinates, 'latitude' | 'longitude'>) {
    return [coords.latitude, coords.longitude]
  }

  function coordAsString(coords: Pick<GeolocationCoordinates, 'latitude' | 'longitude'>) {
    return `${coords.latitude},${coords.longitude}`
  }

  const updateCoords = (coords: GeolocationCoordinates) => {
    setMapBox((prev) => ({ ...prev, coords }))

    if (isLoadingUserLocation) {
      updateIsLoadingUserLocation(false)
    }
  }

  const updateViewState = (viewState: ViewState) => {
    setMapBox((prev) => ({ ...prev, viewState }))
  }

  const updateIsLoadingUserLocation = (isLoading: boolean) => {
    setMapBox((prev) => ({ ...prev, isLoadingUserLocation: isLoading }))
  }

  return {
    updateCoords,
    updateViewState,
    updateIsLoadingUserLocation,
    state: mapbox,
    coords,
    viewState,
    isLoadingUserLocation,
    coordAsString,
    coordAsArray,
  }
}

export default useMapBox
