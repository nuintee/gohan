import { BASE_URL } from '@/config/env'
import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '../constants'

const fetcher = (activityId: string) => {
  return axios.delete(`${BASE_URL}/api/v1/activity/${activityId}`).then((res) => res.data),
}

const useDeleteActivity = ({ activityId = "" }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY, { activityId }],
    mutationFn: async () => fetcher(activityId),
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEY, { activityId: data.id}])
    },
  })
}

export default useDeleteActivity
