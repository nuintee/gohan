import React, { useContext } from 'react'
import { Restaurants } from '@/context'

const useRestaurants = () => {
  return useContext(Restaurants.RestaurantsContext)
}

export default useRestaurants
