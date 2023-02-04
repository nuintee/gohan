import { BASE_URL } from '@/config/env'
import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '../constants'
import { UpdateActivityProps } from '../schemas/addActivity.schema'
import { ActivityResolved } from '../types'

const fetcher = (activityId: string, payload: UpdateActivityProps) => {
  return axios.patch(`${BASE_URL}/api/v1/activity/${activityId}`, payload).then((res) => res.data)
}

const usePatchActivity = ({ activityId = '' }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY, { activityId }],
    mutationFn: async (payload: UpdateActivityProps) => fetcher(activityId, payload),
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
    onSuccess: (data) => {
      console.dir(data)
      queryClient.setQueryData([QUERY_KEY], (prev) => ({ ...prev, ...data }))
    },
  })
}

export default usePatchActivity
