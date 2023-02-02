import { User } from 'next-auth'
import { useSession } from 'next-auth/react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import useToast from '@/libs/react-toastify'

// Env
import { QUERY_KEY } from '../constants'
import { BASE_URL } from '@/config/env'

const fetcher = (userId?: string, payload?: Pick<User, 'name'>) => {
  return axios.patch(`${BASE_URL}/api/v1/user/${userId}`, payload).then((res) => res.data)
}

const useUpdateUser = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY, { user: session?.user }],
    mutationFn: (payload?: Pick<User, 'name'>) => fetcher(session?.user.id, payload),
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error)
        useToast.error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY])
    },
  })
}

export default useUpdateUser
