// Types

import { BASE_URL } from '@/config/env'
import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { Activity } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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

  const add = (payload: AddActivityProps) => {
    console.log(`${BASE_URL}/api/v1/activities`)
    return useMutation(() =>
      axios.post(`${BASE_URL}/api/v1/activities`, payload).then((res) => res.data),
    )
  }

  const get = (activityId: string) => {
    // const url = new URL(`${BASE_URL}/api/v1/activity/${activityId}`)
    // const fetcher = async () => axios.get<Activity>(url.toString())

    // const response = useQuery({
    //   queryKey: ['activity'],
    //   queryFn: () => 'Hello',
    // })
    // return response

    // return useQuery({
    //   queryKey: ['activity'],
    //   queryFn: () => fetch(`${BASE_URL}/api/v1/activity/${activityId}`).then((data) => data.json()),
    // })
    return useQuery([activityId], () =>
      axios.get(`${BASE_URL}/api/v1/activity/${activityId}`).then((res) => res.data),
    )
  }

  const update = (activityId: string, payload?: UpdateActivityProps) => {
    return useMutation(() =>
      axios.patch(`${BASE_URL}/api/v1/activity/${activityId}`, payload).then((res) => res.data),
    )
  }

  const getUserAll = async () => {}

  const remove = (activityId: string) => {
    return useMutation(() =>
      axios.delete(`${BASE_URL}/api/v1/activity/${activityId}`).then((res) => res.data),
    )
  }

  return { add, get, getUserAll, remove, update }
}

export default useActivities
