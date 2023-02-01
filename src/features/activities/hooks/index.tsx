import { BASE_URL } from '@/config/env'
import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { Activity } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { ZodError } from 'zod'
import { AddActivityProps, UpdateActivityProps } from '../schemas/addActivity.schema'
import { ActivityResolved } from '../types'

const BASE_KEY = 'activities'

const useActivities = () => {
  const { data: session, status } = useSession()
  const queryClient = useQueryClient()

  const add = (payload: AddActivityProps) => {
    return useMutation(
      () => axios.post(`${BASE_URL}/api/v1/activities`, payload).then((res) => res.data),
      {
        onMutate: () => {
          if (status !== 'authenticated') throw Error('Unauthorized')
        },
        onSuccess: () => {
          queryClient.invalidateQueries([BASE_KEY, 'user', session.user?.id])
        },
        onError: (error) => {
          useToast.error(error.message)
        },
      },
    )
  }

  const get = (activityId: string, details?: boolean, onlyNeeded?: boolean) => {
    return useQuery<ActivityResolved>(
      [BASE_KEY, activityId],
      () => {
        if (status !== 'authenticated') throw Error('Unauthorized')

        const url = new URL(`${BASE_URL}/api/v1/activity/${activityId}`)
        url.searchParams.append('details', String(details))
        url.searchParams.append('onlyNeeded', String(onlyNeeded))
        return axios.get(url.toString()).then((res) => res.data)
      },
      {
        onError: (error) => {
          useToast.error(error.message)
        },
      },
    )
  }

  // const getUserAll = (props?: { details?: boolean; onlyNeeded?: boolean }) => {
  //   return useQuery<ActivityResolved[]>(
  //     [BASE_KEY, 'user', session?.user?.id],
  //     () => {
  //       if (status !== 'authenticated') throw Error('Unauthorized')

  //       const url = new URL(`${BASE_URL}/api/v1/activities/user/${session.user?.id}`)
  //       url.searchParams.append('details', props?.details)
  //       url.searchParams.append('onlyNeeded', props?.onlyNeeded)

  //       return axios.get(url.toString()).then((res) => res.data)
  //     },
  //     {
  //       onError: (error) => {
  //         useToast.error(error.message)
  //       },
  //       enabled: status === 'authenticated',
  //     },
  //   )
  // }
  const getUserAll = (props = { details: true, onlyNeeded: true }) => {
    return useQuery<ActivityResolved[]>(
      [BASE_KEY, 'user', session?.user?.id],
      () => {
        if (status !== 'authenticated') throw Error('Unauthorized')

        const url = new URL(`${BASE_URL}/api/v1/activities/user/${session.user?.id}`)
        url.searchParams.append('details', String(props?.details !== false))
        url.searchParams.append('onlyNeeded', String(props?.onlyNeeded !== false))

        return axios.get(url.toString()).then((res) => res.data)
      },
      {
        onError: (error) => {
          useToast.error(error.message)
        },
        enabled: status === 'authenticated',
      },
    )
  }

  const update = () => {
    return useMutation(
      ({ activityId, payload }: { activityId: string; payload?: UpdateActivityProps }) =>
        axios.patch(`${BASE_URL}/api/v1/activity/${activityId}`, payload).then((res) => res.data),
      {
        onMutate: () => {
          if (status !== 'authenticated') throw Error('Unauthorized')
        },
        onSuccess: (data, payload) => {
          queryClient.invalidateQueries([BASE_KEY, payload.activityId])
        },
        onError: (error) => {
          useToast.error(error.message)
        },
      },
    )
  }

  const remove = (activityId: string) => {
    return useMutation(
      () => axios.delete(`${BASE_URL}/api/v1/activity/${activityId}`).then((res) => res.data),
      {
        onMutate: () => {
          if (status !== 'authenticated') throw Error('Unauthorized')
        },
        onSuccess: () => {
          queryClient.invalidateQueries([BASE_KEY, activityId])
        },
        onError: (error) => {
          useToast.error(error.message)
        },
      },
    )
  }

  return { add, get, getUserAll, remove, update }
}

export default useActivities
