// Types

import { BASE_URL } from '@/config/env'
import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { Activity } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { ZodError } from 'zod'
import { AddActivityProps, UpdateActivityProps } from '../schemas/addActivity.schema'
import { ActivityResolved } from '../types'

type HandleFetchActivities<T = {}> = (fetcher: () => Promise<any>) => T

const useActivities = () => {
  // const { data: session, status } = useSession()

  const _handleFetchActivities: HandleFetchActivities = async (fetcher) => {
    try {
      // if (status !== 'authenticated') throw new Error('Must be authed to operate this action')
      const { data } = await fetcher()
      return data
    } catch (error) {
      if (error instanceof ZodError) return useToast.info('Invalid parameters')
      return useToast.error(error.message)
    }
  }

  const add = async (payload: AddActivityProps) => {
    const url = new URL(`${BASE_URL}/api/v1/activities`)
    const fetcher = async () => axios.post<Activity>(url.toString(), payload)
    const response = await _handleFetchActivities(fetcher)
    return response
  }

  const get = async (activityId: string) => {}

  const update = async (activityId: string, payload?: UpdateActivityProps) => {
    const url = new URL(`${BASE_URL}/api/v1/activity/${activityId}`)
    const fetcher = async () => axios.patch<Activity>(url.toString(), payload)
    const response = await _handleFetchActivities(fetcher)
    return response
  }

  const getUserAll = async () => {}

  const remove = async (activityId: string) => {
    // return response
    try {
      const url = new URL(`${BASE_URL}/api/v1/activity/${activityId}`)
      const { data } = await axios.delete(url.toString())
      return data
    } catch (error) {
      return error
    }
  }

  return { add, get, getUserAll, remove, update }
}

export default useActivities
