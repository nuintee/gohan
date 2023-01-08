import React, { useState, createContext, ReactNode } from 'react'

const initialValues = {
  activity: {
    isOpen: false,
  },
}

type Props = {
  children: JSX.Element
}

type InitialValues = typeof initialValues

type SidebarTypes = keyof InitialValues

const RestaurantsContext = createContext({})

const RestaurantsProvider = (props: Props) => {
  const { children } = props

  const value = {}

  return <RestaurantsContext.Provider value={value}>{children}</RestaurantsContext.Provider>
}

const Restaurants = {
  RestaurantsContext,
  RestaurantsProvider,
}

export default Restaurants
