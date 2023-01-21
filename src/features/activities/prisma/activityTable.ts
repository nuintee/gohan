import prisma from '@/libs/prisma'
import { Activity } from '@prisma/client'
import { randomUUID } from 'crypto'

const resultFilter = (listFilters?: ListFilter) => {
  const { offset, limit, ...rest } = listFilters

  return {
    ...rest,
    ...(listFilters?.offset && { skip: Number(listFilters?.offset) }),
    ...(listFilters?.limit && { take: Number(listFilters?.limit) }),
  }
}

const handleRequired = <T extends {}>(fields: string[], src: T) => {
  const missing_fields: string[] = []

  fields.forEach((field) => {
    if (src.hasOwnProperty(field)) return
    missing_fields.push(field)
  })

  if (missing_fields.length)
    throw new Error(`${missing_fields} ${missing_fields.length > 1 ? 'are' : 'is'} required`)
}

export type Id = {
  id: string | undefined
}

export type UserId = {
  user_id: string
}

export type ListFilter = {
  limit?: number
  offset?: number
}

export type MutateProps<T> = Id & T

export type ListProps<T extends Id | UserId> = T & ListFilter

type Data = Activity & UserId

const activityTable = {
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
  add: async (props: Data) => {
    const required_fields = ['user_id', 'place_id']
    handleRequired(required_fields, props)

    const id = props?.place_id || randomUUID()
    const addedActivity = await prisma.activity.create({
      data: { ...props, id, discovered_at: new Date().toISOString() },
    })
    return addedActivity
  },
  patch: async (props: MutateProps<Data>) => {
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

export default activityTable
