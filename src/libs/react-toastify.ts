import { toast, ToastContent, ToastOptions } from 'react-toastify'

const userToast = (content: ToastContent, options?: ToastOptions) => toast(content, options)
userToast.error = (content: ToastContent, options?: ToastOptions) => toast.error(content, options)
userToast.info = (content: ToastContent, options?: ToastOptions) => toast.info(content, options)
userToast.success = (content: ToastContent, options?: ToastOptions) =>
  toast.success(content, options)

export default userToast
