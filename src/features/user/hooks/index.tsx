import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import axios from '@/libs/axios'

// types
import { UpdateUserProps } from '@/features/user/schema'
// env
import { BASE_URL } from '@/config/env'
import useToast from '@/libs/react-toastify'
const BASE_KEY = 'user'

const useUser = () => {
  const quryClient = useQueryClient()
  const { data: seesion, status } = useSession()
  const user = seesion?.user

  const update = (payload: UpdateUserProps) => {
    return useMutation(
      () => axios.patch(`${BASE_URL}/api/v1/user/${user?.id}`, payload).then((res) => res.data),
      {
        onSuccess: (data) => {
          quryClient.invalidateQueries([BASE_KEY])
        },
        onError: (error) => {
          useToast.error(error.message)
        },
      },
    )
  }

  const get = () => {
    return useQuery({
      queryKey: [BASE_KEY],
      queryFn: async () => {
        return user
      },
      enabled: status === 'authenticated',
    })
  }

  return { update, get }
}

export default useUser
