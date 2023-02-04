import { BASE_URL } from '@/config/env'
import useMapBox from '@/features/mapbox/hooks'
import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRecoilValue } from 'recoil'

// Env
import { QUERY_KEY } from '../constants'
import { ActivityResolved } from '../types'
import useActivityPanel from './useActivityPanel'

const fetcher = ({
  userId,
  details,
  onlyNeeded,
}: {
  userId: string
  details?: boolean
  onlyNeeded?: boolean
}) => {
  const url = new URL(`${BASE_URL}/api/v1/activities/user/${userId}`)
  url.searchParams.append('details', String(details))
  url.searchParams.append('onlyNeeded', String(onlyNeeded))
  return axios.get(url.toString()).then((res) => res.data)
}

const useGetUserActivities = (props: {
  userId?: string
  details?: boolean
  onlyNeeded?: boolean
}) => {
  const { data: session, status } = useSession()
  const { isPanelOpen } = useActivityPanel()
  const { userId = session?.user.id, details = true, onlyNeeded = true } = props

  return useQuery<ActivityResolved[]>({
    queryKey: [QUERY_KEY, 'user', { userId }],
    queryFn: () => fetcher({ userId, details, onlyNeeded }),
    enabled: status === 'authenticated' && isPanelOpen,
    onError: (error) => {
      console.error(error)

      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
    onSuccess: (data) => {
      console.log(data)
    },
  })
}

export default useGetUserActivities
