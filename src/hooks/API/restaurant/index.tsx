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

  return { getRestaurant, clearRestaurant }
}

export default useRestaurantSearch
