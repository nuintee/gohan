import { User } from 'next-auth'
import { useSession } from 'next-auth/react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import useToast from '@/libs/react-toastify'

// Env
import { QUERY_KEY } from '@/features/restaurants/constants'
import useMapBox from '@/features/mapbox/hooks'
import useModals from '@/hooks/modals'

const useClearRestaurant = () => {
  const queryClient = useQueryClient()
  const { coords } = useMapBox()
  const { close } = useModals()

  return useMutation({
    mutationKey: [QUERY_KEY, { coords }],
    mutationFn: async () => {
      queryClient.setQueryData([QUERY_KEY, { coords }], () => ({}))
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error)
        useToast.error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY])
      close('restaurantdiscovered')
    },
  })
}

export default useClearRestaurant
