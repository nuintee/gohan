import React, { useState, createContext, ReactNode } from 'react'

type Props = {
  children: JSX.Element
}

const initialValues = {
  details: {
    id: 0,
    isOpen: false,
  },
  confirm: {
    isOpen: false,
  },
  user: {
    isOpen: false,
  },
}

const ModalsContext = createContext({
  modalsState: initialValues,
  setModalsState: () => {},
})

const ModalsProvider = (props: Props) => {
  const { children } = props
  const [modalsState, setModalsState] = useState(initialValues)

  const value = {
    modalsState,
    setModalsState,
  }

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
}

const Modals = {
  ModalsContext,
  ModalsProvider,
}

export default Modals
