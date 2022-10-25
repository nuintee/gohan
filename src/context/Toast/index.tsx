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

type ToastTypes = keyof InitialValues

const ToastContext = createContext({
  toastState: initialValues,
})

const ToastProvider = (props: Props) => {
  const { children } = props
  const [toastState, setToastState] = useState(initialValues)

  const manageToast = (type: ToastTypes, isOpen: boolean) => {
    setToastState((prev) => ({
      ...prev,
      [type]: {
        isOpen,
      },
    }))
  }

  const value = {
    toastState,
    setToastState,
    manageToast,
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

const Toast = {
  ToastContext,
  ToastProvider,
}

export default Toast
