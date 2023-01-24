import { toast as t, ToastContent, ToastContentProps, ToastOptions } from 'react-toastify'

const useToast = () => {
  const success = (content: ToastContent, options?: ToastOptions) => {
    return t.success(content, options)
  }

  const error = (content: ToastContent, options?: ToastOptions) => {
    return t.error(content, options)
  }

  const info = (content: ToastContent, options?: ToastOptions) => {
    return t.info(content, options)
  }

  const warn = (content: ToastContent, options?: ToastOptions) => {
    return t.warn(content, options)
  }

  const normal = (content: ToastContent, options?: ToastOptions) => {
    return t(content, options)
  }

  return { success, error, info, warn, normal }
}

export default useToast
