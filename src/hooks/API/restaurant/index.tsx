import { RestaurantResult } from '@/context/Restaurants'
import useRestaurants from '@/hooks/context/Restaurants'

const useRestaurantSearch = () => {
  const { restaurant, setRestaurant } = useRestaurants()

  const getRestaurant = (options) => {
    setRestaurant((prev: RestaurantResult) => ({ ...prev, isFetching: true }))
    setTimeout(() => {
      // Fetch
      setRestaurant((prev: RestaurantResult) => ({ ...prev, isFetching: false }))
    }, 2000)
  }

  const clearRestaurant = () => {
    setRestaurant({})
  }

  return { getRestaurant, clearRestaurant }
}

export default useRestaurantSearch
