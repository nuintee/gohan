import { toast as t, ToastContent, ToastContentProps, ToastOptions } from 'react-toastify'

const useToast = (content: ToastContent, options?: ToastOptions) => {
  return t(content, options)
}

export default useToast
