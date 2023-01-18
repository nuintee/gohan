import { RestaurantResult } from '@/context/Restaurants'
import useRestaurants from '@/hooks/context/Restaurants'

// constants
import { Coords } from '@/constants/coords'
import useGPS from '@/hooks/context/GPS'
import { useMapBox } from '@/hooks/context'
import { ResultsEntity } from '@/hooks/context/Restaurants/types'
import routeData from '@/data/route/index.json'

export type RestaurantOptions = {
  drawRoute?: boolean
  locateUser?: boolean
}

export type GetRouteProps = {
  profileType?: 'walking'
  start: Coords
  end: Coords
  _dev?: {
    place_id?: string | null
  }
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

  // Add Demo Fetching
  const getRestaurant = async (options: RestaurantOptions) => {
    setRestaurant((prev: RestaurantResult) => ({ ...prev, isFetching: true }))
    const data: ResultsEntity = await _fetchRestaurant(currentPosition)
    const { lat: latitude, lng: longitude } = data?.geometry?.location
    setRestaurant((prev: RestaurantResult) => ({ ...prev, data }))

    if (options?.locateUser === false) {
    } else {
      locateUser()
    }

    if (options?.drawRoute === false) {
    } else {
      const place_id = data?.place_id
      await drawRoute(
        {
          latitude,
          longitude,
        },
        place_id,
      )
    }

    setRestaurant((prev: RestaurantResult) => ({ ...prev, isFetching: false }))
  }

  const clearRestaurant = () => {
    clearRoute()
    setRestaurant({})
  }

  // Add Dev Route
  const getRoute = async (props: GetRouteProps) => {
    const { profileType, start, end, _dev } = props
    function _formatAPICoords(coords: Coords) {
      const { latitude, longitude } = coords
      return `${longitude},${latitude}`
    }
    const formattedStart = _formatAPICoords(start)
    const formattedEnd = _formatAPICoords(end)
    let baseURL = `/api/route?profileType=${profileType}&start=${formattedStart}&end=${formattedEnd}`

    if (_dev?.place_id) {
      baseURL += `&place_id=${_dev?.place_id}`
    }

    try {
      const query = await fetch(baseURL)
      const res = await query.json()
      return res
    } catch (error) {
      console.error(error)
    }
  }

  return { getRestaurant, clearRestaurant, getRoute, formatObjectCoords }
}

export default useRestaurantSearch
