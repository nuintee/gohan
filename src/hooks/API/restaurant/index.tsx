import { RestaurantResult } from '@/context/Restaurants'
import useRestaurants from '@/hooks/context/Restaurants'

export type RestaurantOptions = {
  drawRoute?: boolean
}

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

  const getRoute = async ({ profileType, start, end }) => {
    try {
      const base_coordinates = encodeURIComponent(`${start};${end}`)
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
      console.log(endpoint)
    } catch (error) {
      console.error(error)
    }
  }

  return { getRestaurant, clearRestaurant, getRoute }
}

export default useRestaurantSearch
