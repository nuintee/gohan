import React, { useState, createContext, ReactNode } from 'react'

import { ResultsEntity } from '@/hooks/context/Restaurants/types'

type Props = {
  children: JSX.Element
}

type RestaurantGetOptions = {}

const RestaurantsContext = createContext({
  restaurant: {},
  setRestaurant: useState<ResultsEntity | {}>,
  restaurantsList: [],
  setRestaurantsList: useState<ResultsEntity[] | []>,
  isFetching: false,
  setIsFetching: useState<boolean>,
})

const RestaurantsProvider = (props: Props) => {
  const { children } = props

  const [restaurantsList, setRestaurantsList] = useState<ResultsEntity[] | []>([])
  const [restaurant, setRestaurant] = useState<ResultsEntity | {}>({})
  const [isFetching, setIsFetching] = useState(false)

  const value = {
    restaurant,
    setRestaurant,
    restaurantsList,
    setRestaurantsList,
    isFetching,
    setIsFetching,
  }

  return <RestaurantsContext.Provider value={value}>{children}</RestaurantsContext.Provider>
}

const Restaurants = {
  RestaurantsContext,
  RestaurantsProvider,
}

export default Restaurants
