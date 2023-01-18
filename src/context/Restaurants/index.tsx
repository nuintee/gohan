import React, { useState, createContext, ReactNode } from 'react'

import { ResultsEntity } from '@/hooks/context/Restaurants/types'

type Props = {
  children: JSX.Element
}

type RestaurantGetOptions = {}

export type RestaurantResult = {
  data: ResultsEntity
  isFetching: boolean
}

const RestaurantsContext = createContext({
  restaurant: { data: {}, isNavigating: false, isFetching: false },
  setRestaurant: useState<RestaurantResult | {}>,
  restaurantsList: [],
  setRestaurantsList: useState<ResultsEntity[] | []>,
  isFetching: false,
  setIsFetching: useState<boolean>,
})

const RestaurantsProvider = (props: Props) => {
  const { children } = props

  const [restaurantsList, setRestaurantsList] = useState<ResultsEntity[] | []>([])
  const [restaurant, setRestaurant] = useState<RestaurantResult | {}>({})

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
