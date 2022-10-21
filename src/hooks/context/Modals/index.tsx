import React, { useContext } from 'react'
import { Modals } from '@/context'

const useModals = () => {
  return useContext(Modals.ModalsContext)
}

export default useModals
