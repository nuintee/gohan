import { toast, ToastContent, ToastOptions } from 'react-toastify'

const useToast = (content: ToastContent, options?: ToastOptions) => toast(content, options)
useToast.error = (content: ToastContent, options?: ToastOptions) => toast.error(content, options)
useToast.info = (content: ToastContent, options?: ToastOptions) => toast.info(content, options)
useToast.success = (content: ToastContent, options?: ToastOptions) =>
  toast.success(content, options)

export default useToast
