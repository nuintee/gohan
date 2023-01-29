import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

// types
import { UpdateUserProps } from '@/features/user/schema'

const useUser = () => {
  const { data: seesion, status } = useSession()

  const update = (payload: UpdateUserProps) => {
    return useMutation(() => {}, {})
  }
}

export default useUser
