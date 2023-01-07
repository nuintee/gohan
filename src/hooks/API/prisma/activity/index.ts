import prisma from '@/lib/prisma'
import { randomUUID } from 'crypto'
import { resultFilter } from '..'
import { Id, UserId, ListFilter, MutateProps } from '../types'

type Data = {
  place_id: string
  is_liked: boolean
}

type ListProps = UserId & ListFilter

const activityTable = {
  get: async (props: Id) => {
    const fetchedActivity = await prisma.activity.findUniqueOrThrow({
      where: {
        id: props.id,
      },
    })
    return fetchedActivity
  },
  getUserAll: async (props: ListProps) => {
    const { user_id, ...rest } = props
    const fetchedUserActivities = await prisma.activity.findMany({
      where: {
        user_id: props?.user_id,
      },
      ...resultFilter(rest),
    })
    return fetchedUserActivities
  },
  getAll: async (props: ListFilter) => {
    const fetchedActivities = await prisma.activity.findMany(resultFilter(props))
    return fetchedActivities
  },
  add: async (props: Data) => {
    const id = randomUUID()
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
