import prisma from '@/libs/prisma'
import { Activity } from '@prisma/client'
import { randomUUID } from 'crypto'

// Schemas
import {
  addActivitySchema,
  UpdateActivityProps,
} from '@/features/activities/schemas/addActivity.schema'

export type ListFilter = {
  limit?: number
  offset?: number
}

const resultFilter = (listFilters?: ListFilter) => {
  const { offset, limit, ...rest } = listFilters

  return {
    ...rest,
    ...(listFilters?.offset && { skip: Number(listFilters?.offset) }),
    ...(listFilters?.limit && { take: Number(listFilters?.limit) }),
  }
}

export type ListProps<T extends Id | UserId> = T & ListFilter

// --- to here

export type Id = {
  id: string | undefined
}

export type UserId = {
  user_id: string
}

export type MutateProps<T> = Id & T

export const activityTable = {
  get: async (props: Id) => {
    const fetchedActivity = await prisma.activity.findUniqueOrThrow({
      where: {
        id: props.id,
      },
    })
    return fetchedActivity
  },
  getUserAll: async (props: ListProps<UserId>) => {
    const { user_id, ...rest } = props

    const fetchedUserActivities = await prisma.activity.findMany({
      where: {
        user_id: props?.user_id,
      },
      ...resultFilter(rest),
    })
    return fetchedUserActivities
  },
  getAll: async (props?: ListFilter) => {
    const fetchedActivities = await prisma.activity.findMany(resultFilter(props))
    return fetchedActivities
  },
  add: async (props: Activity) => {
    await addActivitySchema.parse(props)

    const id = props?.place_id || randomUUID()
    const addedActivity = await prisma.activity.create({
      data: { ...props, id, discovered_at: new Date().toISOString() },
    })
    return addedActivity
  },
  patch: async (props: UpdateActivityProps & { id: string }) => {
    const updatedUser = await prisma.activity.update({
      where: {
        id: props.id,
      },
      data: {
        is_liked: props?.is_liked,
        place_id: props?.place_id,
      },
    })
    return updatedUser
  },
  delete: async (props: Id) => {
    const deletedUsers = await prisma.activity.delete({
      where: {
        id: props.id,
      },
    })
    return deletedUsers
  },
  deleteUserAll: async (props: UserId) => {
    const deletedUser = await prisma.activity.deleteMany({
      where: {
        user_id: props.user_id,
      },
    })
    return deletedUser
  },
}
