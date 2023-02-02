import { BASE_URL } from '@/config/env'
import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { useQuery } from '@tanstack/react-query'

// Env
import { QUERY_KEY } from '../constants'
import { ActivityResolved } from '../types'

const fetcher = ({
  activityId,
  details,
  onlyNeeded,
}: {
  activityId: string
  details?: boolean
  onlyNeeded?: boolean
}) => {
  const url = new URL(`${BASE_URL}/api/v1/activity/${activityId}`)
  url.searchParams.append('details', String(details))
  url.searchParams.append('onlyNeeded', String(onlyNeeded))
  return axios.get(url.toString()).then((res) => res.data)
}

const useGetActivity = ({
  activityId,
  details = true,
  onlyNeeded = true,
}: {
  activityId: string
  details?: boolean
  onlyNeeded?: boolean
}) => {
  return useQuery<ActivityResolved>({
    queryKey: [QUERY_KEY, { activityId, details, onlyNeeded }],
    queryFn: () => fetcher({ activityId, details, onlyNeeded }),
    enabled: false,
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

export default useGetActivity
