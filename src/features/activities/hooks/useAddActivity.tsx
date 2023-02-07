import { BASE_URL } from '@/config/env'
import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '../constants'
import { AddActivityProps } from '../schemas/addActivity.schema'

// const fetcher = (payload: AddActivityProps) => {
//   return axios.post(`${BASE_URL}/api/v1/activities`, payload).then((res) => res.data)
// }

// const useAddActivity = ({ activityId = '' }) => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationKey: [QUERY_KEY, { activityId }],
//     mutationFn: async (payload: AddActivityProps) => fetcher(payload),
//     onError: (error) => {
//       console.error(error)
//       if (error instanceof Error) {
//         useToast.error(error.message)
//       }
//     },
//     onSuccess: (data) => {
//       queryClient.invalidateQueries([QUERY_KEY, { activityId: data.id }])
//     },
//   })
// }
const useAddActivity = () => {}

export default useAddActivity
