import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import axios from '@/libs/axios'

// types
import { UpdateUserProps } from '@/features/user/schema'
import useToast from '@/libs/react-toastify'

// env
import { BASE_URL } from '@/config/env'
const BASE_KEY = ['user']

const useUser = () => {
  const quryClient = useQueryClient()
  const { data: seesion, status } = useSession()

  const update = (payload: UpdateUserProps) => {
    return useMutation(() => axios.patch(`${BASE_URL}/api/v1/user/${seesion?.user.id}`, payload), {
      onSuccess: () => {
        quryClient.invalidateQueries([BASE_KEY])
      },
      onError: (error) => {
        useToast.error(error)
      },
    })
  }

  return update
}

export default useUser
