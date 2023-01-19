import React, { useContext } from 'react'
import { Sidebar } from '@/context'

const useSidebar = () => {
  return useContext(Sidebar.SidebarContext)
}

export default useSidebar
