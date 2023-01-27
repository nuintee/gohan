import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Env
import { BASE_URL } from '@/config/env'

const useRestaurants = () => {
  const queryClient = useQueryClient()

  const get = () => {
    // return useQuery(
    //   ['restaurants'],
    //   () => {
    //     if (status !== 'authenticated') throw Error('Unauthorized')
    //     return axios.get(`${BASE_URL}/api/v1`).then((res) => res.data)
    //   },
    //   {
    //     onError: (error) => {
    //       useToast.error(error.message)
    //     },
    //   },
    // )
    return useQuery(['restaurnats'], () => {
      return {
        ono: 'DEVS',
      }
    }).data
  }

  const getDetails = (place_id: string) => {
    return useQuery(
      ['restaurants'],
      () => {
        if (status !== 'authenticated') throw Error('Unauthorized')
        return axios.get(`${BASE_URL}/api/v1`).then((res) => res.data)
      },
      {
        onError: (error) => {
          useToast.error(error.message)
        },
      },
    )
  }

  const clear = () => {
    return queryClient.setQueryData(['users'], {})
  }

  return { get, getDetails, clear }
}

export default useRestaurants
