import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'
import { signOut } from 'next-auth/react'

const useDeleteUser = () => {
  return trpc.deleteUser.useMutation({
    onError: (error) => {
      console.error(error)

      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
    onSuccess: (data) => {
      console.log(data)
      signOut()
    },
  })
}

export default useDeleteUser
