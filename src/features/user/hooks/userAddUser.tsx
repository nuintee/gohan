import { User } from 'next-auth'
import { useSession } from 'next-auth/react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import useToast from '@/libs/react-toastify'

// Env
import { QUERY_KEY } from '../constants'
import { BASE_URL } from '@/config/env'
import { AddUserProps } from '../schema'

const fetcher = (payload?: AddUserProps) => {
  return axios.post(`${BASE_URL}/api/v1/users`, payload).then((res) => res.data)
}

const useAddUser = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY, { user: session?.user }],
    mutationFn: (payload?: AddUserProps) => fetcher(payload),
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY])
    },
  })
}

export default useAddUser
