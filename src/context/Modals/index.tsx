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
  manageModal: (type: ModalTypes, isOpen: boolean) => {},
})

const ModalsProvider = (props: Props) => {
  const { children } = props
  const [modalsState, setModalsState] = useState(initialValues)

  const manageModal = (type: ModalTypes, isOpen: boolean, payload) => {
    setModalsState((prev) => ({
      ...prev,
      [type]: {
        isOpen,
        ...(payload && { ...payload }),
      },
    }))
  }

  const value = {
    modalsState,
    setModalsState,
    manageModal,
  }

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
}

const Modals = {
  ModalsContext,
  ModalsProvider,
}

export default Modals
