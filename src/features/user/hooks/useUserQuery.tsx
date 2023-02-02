import { User } from 'next-auth'
import { useSession } from 'next-auth/react'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useToast from '@/libs/react-toastify'

// Env
import { QUERY_KEY } from '../constants'
import { BASE_URL } from '@/config/env'

const fetcher = (user?: User) => {
  if (!user) throw Error('Unauthed Request', { cause: 'User Must be Authed' })

  return axios.get(`${BASE_URL}/api/v1/user/${user?.id}`).then((res) => res.data)
}

const useUserQuery = () => {
  const { status, data: session } = useSession()

  return useQuery({
    queryKey: [QUERY_KEY, { user: session?.user }],
    queryFn: () => fetcher(session?.user),
    enabled: status === 'authenticated',
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error)
        useToast.error(error.message)
      }
    },
  })
}

export default useUserQuery
