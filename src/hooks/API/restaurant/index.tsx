import { RestaurantResult } from '@/context/Restaurants'
import useRestaurants from '@/hooks/context/Restaurants'

// constants
import { Coords } from '@/constants/coords'
import useGPS from '@/hooks/context/GPS'
import { useMapBox } from '@/hooks/context'
import { ResultsEntity } from '@/hooks/context/Restaurants/types'

export type RestaurantOptions = {
  drawRoute?: boolean
  locateUser?: boolean
}

export type GetRouteProps = {
  profileType?: 'walking'
  start: Coords
  end: Coords
}

// Env
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN
const gcpKey = process.env.NEXT_PUBLIC_GCP_API_KEY

const useRestaurantSearch = () => {
  const { restaurant, setRestaurant } = useRestaurants()
  const { currentPosition } = useGPS()
  const { drawRoute, clearRoute, locateUser } = useMapBox()

  type _CoordObject = Coords | { lat: number | null; lng: number | null }

  const formatObjectCoords = (coordObject: _CoordObject): number[] => {
    if (!coordObject) return []
    return Object.keys(coordObject)
      .sort()
      .map((k) => coordObject[k])
  }

  const _fetchRestaurant = async (coords: Coords) => {
    const is_devmode = process.env.NODE_ENV === 'development'
    try {
      const url = is_devmode
        ? `/api/place?location=${coords.latitude},${coords.longitude}&radius=500&opennow=true`
        : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=500&types=food&opennow=true&key=${gcpKey}`
      const query = await fetch(url)
      const json = await query.json()
      return json
    } catch (error) {
      console.error(error)
    }
  }

  const getRestaurant = (options: RestaurantOptions) => {
    setRestaurant((prev: RestaurantResult) => ({ ...prev, isFetching: true }))
    setTimeout(async () => {
      // Fetch
      const data: ResultsEntity = await _fetchRestaurant(currentPosition)
      const { lat: latitude, lng: longitude } = data.geometry?.location
      setRestaurant((prev: RestaurantResult) => ({ ...prev, data }))

      if (options?.locateUser === undefined || options?.locateUser === true) {
        locateUser()
      }

      if (options?.drawRoute) {
        // drawRoute on MapBox
        drawRoute({
          latitude,
          longitude,
        })
      }
      setRestaurant((prev: RestaurantResult) => ({ ...prev, isFetching: false }))
    }, 2000)
  }

  const clearRestaurant = () => {
    clearRoute()
    setRestaurant({})
  }

  const getRoute = async (props: GetRouteProps) => {
    const { profileType, start, end } = props

    function _formatCoords(coords: Coords) {
      const { latitude, longitude } = coords
      return `${longitude},${latitude}`
    }

    const base_coordinates = encodeURIComponent(`${_formatCoords(start)};${_formatCoords(end)}`)
    const profile = `mapbox/${profileType || 'walking'}`
    const baseURL = `https://api.mapbox.com/directions/v5/${profile}/${base_coordinates}?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxAccessToken}`

    try {
      const query = await fetch(baseURL)
      const data = await query.json()
      const coordinates = data?.routes[0].geometry.coordinates
      return { data, coordinates }
    } catch (error) {
      console.error(error)
    }
  }

  return { getRestaurant, clearRestaurant, getRoute, formatObjectCoords }
}

export default useRestaurantSearch
