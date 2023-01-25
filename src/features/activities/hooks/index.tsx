// Types

import { BASE_URL } from '@/config/env'
import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { Activity } from '@prisma/client'
import { ZodError } from 'zod'

const useActivities = () => {
  const add = async (payload: Activity) => {
    try {
      const url = new URL(`${BASE_URL}/api/v1/activities`)
      const { data } = await axios.post<Activity>(url.toString(), payload)
      return data
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) return useToast.info('Invalid parameters')

      useToast.error(error.message)
    }
  }

  const get = async (activityId: string): Activity => {}

  const update = async (activityId: string, payload: Activity) => {}

  const getUserAll = async () => {}

  const remove = async (activityId: string) => {}

  return { add, get, getUserAll, remove, update }
}

export default useActivities
