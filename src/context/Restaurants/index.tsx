import React, { useState, createContext, ReactNode } from 'react'

import { ResultsEntity } from '@/hooks/context/Restaurants/types'

type Props = {
  children: JSX.Element
}

const RestaurantsContext = createContext({})

const RestaurantsProvider = (props: Props) => {
  const { children } = props

  const [restaurant, setRestaurant] = useState<ResultsEntity | {}>({})

  const value = {
    restaurant,
    setRestaurant,
  }

  return <RestaurantsContext.Provider value={value}>{children}</RestaurantsContext.Provider>
}

const Restaurants = {
  RestaurantsContext,
  RestaurantsProvider,
}

export default Restaurants
