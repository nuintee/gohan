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

const SidebarContext = createContext({
  sidebarState: initialValues,
  setSidebarState: () => {},
  manageSidebar: () => {},
})

const SidebarProvider = (props: Props) => {
  const { children } = props
  const [sidebarState, setSidebarState] = useState(initialValues)

  const manageSidebar = (type: SidebarTypes, isOpen: boolean) => {
    setSidebarState((prev) => ({
      ...prev,
      [type]: {
        isOpen,
      },
    }))
  }

  const value = {
    sidebarState,
    setSidebarState,
    manageSidebar,
  }

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

const Sidebar = {
  SidebarContext,
  SidebarProvider,
}

export default Sidebar
