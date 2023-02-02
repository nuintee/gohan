import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'

// Env
const BASE_KEY = 'user'
import { BASE_URL } from '@/config/env'

const fetcher = (user: User) => {
  return axios.get(`${BASE_URL}/api/v1/user/${user?.id}`).then((res) => res.data || user),
}

const useUserQuery = () => {
  const { status, data: session } = useSession()

  return useQuery({
    queryKey: [BASE_KEY, { user: session?.user }],
    queryFn: () => fetcher(session?.user),
    enabled: status === 'authenticated',
  })
}

export default useUserQuery
