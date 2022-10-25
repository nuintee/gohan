import React, { useState, createContext, ReactNode } from 'react'

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

type Props = {
  children: JSX.Element
}

type InitialValues = typeof initialValues

type ModalTypes = keyof InitialValues

const ModalsContext = createContext({
  modalsState: initialValues,
  setModalsState: () => {},
  setModal: () => {},
})

const ModalsProvider = (props: Props) => {
  const { children } = props
  const [modalsState, setModalsState] = useState(initialValues)

  const setModal = (type: ModalTypes, isOpen: boolean) => {
    setModalsState((prev) => ({
      ...prev,
      [type]: {
        isOpen,
      },
    }))
  }

  const value = {
    modalsState,
    setModalsState,
    setModal,
  }

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
}

const Modals = {
  ModalsContext,
  ModalsProvider,
}

export default Modals
