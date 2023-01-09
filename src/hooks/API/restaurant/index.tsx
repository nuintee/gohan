import { RestaurantResult } from '@/context/Restaurants'
import useRestaurants from '@/hooks/context/Restaurants'

// constants
import { Coords } from '@/constants/coords'

export type RestaurantOptions = {
  drawRoute?: boolean
}

export type GetRouteProps = {
  profileType?: 'walking'
  start: Coords
  end: Coords
}

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

const useRestaurantSearch = () => {
  const { restaurant, setRestaurant } = useRestaurants()

  const getRestaurant = (options: RestaurantOptions) => {
    setRestaurant((prev: RestaurantResult) => ({ ...prev, isFetching: true }))
    setTimeout(() => {
      // Fetch
      if (options?.drawRoute) {
        // drawRoute on MapBox
      }
      setRestaurant((prev: RestaurantResult) => ({ ...prev, isFetching: false }))
    }, 2000)
  }

  const clearRestaurant = () => {
    setRestaurant({})
  }

  const getRoute = async (props: GetRouteProps) => {
    const { profileType, start, end } = props

    function _formatCoords(coords: Coords) {
      const { latitude, longitude } = coords
      return `${latitude}, ${longitude}`
    }

    try {
      const base_coordinates = encodeURIComponent(`${_formatCoords(start)};${_formatCoords(end)}`)
      const profile = `mapbox/${profileType || 'walking'}`
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/${profile}/${base_coordinates}?alternatives=true&geometries=geojson&language=en&overview=simplified&access_token=${mapboxAccessToken}`,
      )
      const json = await query.json()
      const routes = json?.routes
      const waypoints = json?.waypoints
      const coordinates = routes?.map((route) => route.geometry.coordinates)
      const endpoint = waypoints.map((waypoint) => waypoint.location)
      // addSource
      console.log(json)
      return { coordinates, endpoint }
    } catch (error) {
      console.error(error)
    }
  }

  return { getRestaurant, clearRestaurant, getRoute }
}

export default useRestaurantSearch
