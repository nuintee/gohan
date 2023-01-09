import useRestaurants from '@/hooks/context/Restaurants'

const useRestaurantSearch = () => {
  const { restaurant, setRestaurant, setIsFetching } = useRestaurants()

  const getRestaurant = (options) => {
    setIsFetching(true)
    setTimeout(() => {
      // Fetch
      setIsFetching(false)
    }, 2000)
  }

  const clearRestaurant = () => {
    setRestaurant({})
  }

  return { getRestaurant, clearRestaurant }
}

export default useRestaurantSearch
