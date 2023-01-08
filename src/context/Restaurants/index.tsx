import React, { useState, createContext, ReactNode } from 'react'

import { ResultsEntity } from '@/hooks/context/Restaurants/types'

type Props = {
  children: JSX.Element
}

type RestaurantGetOptions = {}

const RestaurantsContext = createContext({})

const RestaurantsProvider = (props: Props) => {
  const { children } = props

  const [restaurantsList, setRestaurantsList] = useState<ResultsEntity[] | []>([])
  const [restaurant, setRestaurant] = useState<ResultsEntity | {}>({})

  const getRestaurant = (options: RestaurantGetOptions) => {}

  const value = {
    restaurant,
    setRestaurant,
    restaurantsList,
    setRestaurantsList,
  }

  return <RestaurantsContext.Provider value={value}>{children}</RestaurantsContext.Provider>
}

const Restaurants = {
  RestaurantsContext,
  RestaurantsProvider,
}

export default Restaurants
