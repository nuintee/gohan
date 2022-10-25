import React, { useState, createContext, ReactNode } from 'react'

// Types
import { Props as InitialValues } from '@/components/Toast/index.types'

const initialValues: InitialValues = {
  isOpen: false,
  mode: 'success',
  main: 'MODAL',
  onClose: () => {},
}

type Props = {
  children: React.ReactNode
}

const ToastContext = createContext({
  toastState: initialValues,
  manageToast: (payload: InitialValues) => {},
})

const ToastProvider = (props: Props) => {
  const { children } = props
  const [toastState, setToastState] = useState(initialValues)

  // const manageToast = (key: keyof InitialValues, value: string) => {
  //   setToastState((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }))
  // }
  const manageToast = (payload: InitialValues) => {
    setToastState((prev) => ({
      ...prev,
      ...payload,
    }))
  }

  const value = {
    toastState,
    manageToast,
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

const Toast = {
  ToastContext,
  ToastProvider,
}

export default Toast
