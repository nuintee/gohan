import React, { useContext } from 'react'
import { Toast } from '@/context'

const useToast = () => {
  return useContext(Toast.ToastContext)
}

export default useToast
