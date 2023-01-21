import { ComponentProps, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = ComponentProps<typeof ToastContainer>

const ToastCatcher = (props: Props) => {
  return <ToastContainer {...props} />
}

export default ToastCatcher
