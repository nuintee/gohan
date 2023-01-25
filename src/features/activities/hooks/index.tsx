// Types

import { BASE_URL } from '@/config/env'
import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { Activity } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { ZodError } from 'zod'
import { ActivityResolved } from '../types'

const useActivities = () => {
  const { data: session, status } = useSession()

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

  const get = async (activityId: string) => {
    try {
      const url = new URL(`${BASE_URL}/api/v1/activity/${activityId}`)
      const { data } = await axios.get<ActivityResolved>(url.toString())
      return data
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) return useToast.info('Invalid parameters')
      useToast.error(error.message)
    }
  }

  const update = async (activityId: string, payload?: Activity) => {
    try {
      const url = new URL(`${BASE_URL}/api/v1/activity/${activityId}`)
      const { data } = await axios.patch<Activity>(url.toString(), payload)
      return data
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) return useToast.info('Invalid parameters')
      useToast.error(error.message)
    }
  }

  const getUserAll = async () => {
    try {
      if (status !== 'authenticated') throw new Error('Must be authed to operate this action')
      const url = new URL(`${BASE_URL}/api/v1/activities/user/${session?.user?.id}`)
      const { data } = await axios.get<ActivityResolved[]>(url.toString())
      return data
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) return useToast.info('Invalid parameters')
      useToast.error(error.message)
    }
  }

  const remove = async (activityId: string) => {
    try {
      const url = new URL(`${BASE_URL}/api/v1/activitiy/${activityId}`)
      const { data } = await axios.delete<Activity>(url.toString())
      return data
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) return useToast.info('Invalid parameters')
      useToast.error(error.message)
    }
  }

  return { add, get, getUserAll, remove, update }
}

export default useActivities
