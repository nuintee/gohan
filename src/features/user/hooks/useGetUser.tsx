import { User } from 'next-auth'
import { useSession } from 'next-auth/react'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useToast from '@/libs/react-toastify'

// Env
import { QUERY_KEY } from '../constants'
import { BASE_URL } from '@/config/env'

const fetcher = (userId?: string) => {
  if (!userId) throw Error('Unauthed Request', { cause: 'User Must be Authed' })

  return axios.get(`${BASE_URL}/api/v1/user/${userId}`).then((res) => res.data)
}

type Props = {
  userId: string
}

const useGetUser = (props?: Props) => {
  const { status, data: session } = useSession()
  const userId = props?.userId || session?.user.id

  return useQuery({
    queryKey: [QUERY_KEY, { user: userId }],
    queryFn: () => fetcher(userId),
    enabled: status === 'authenticated',
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
  })
}

export default useGetUser
