import prisma from '@/libs/prisma'
import { Activity } from '@prisma/client'
import { randomUUID } from 'crypto'

// Schemas
import { AddUserProps, addUserSchema, updateUserSchema } from '../schema'

// Replace from with Zod from here ---
const resultFilter = (listFilters?: ListFilter) => {
  const { offset, limit, ...rest } = listFilters

  return {
    ...rest,
    ...(listFilters?.offset && { skip: Number(listFilters?.offset) }),
    ...(listFilters?.limit && { take: Number(listFilters?.limit) }),
  }
}

export type ListFilter = {
  limit?: number
  offset?: number
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

export const userTable = {
  get: async (props: Id) => {
    const fetchedUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: props.id,
      },
    })
    return fetchedUser
  },
  getAll: async (props: ListFilter) => {
    const fetchedUsers = await prisma.user.findMany(resultFilter(props))
    return fetchedUsers
  },
  add: async (props: AddUserProps) => {
    await addUserSchema.parse(props)

    const id = props.id || randomUUID()
    const addedUser = await prisma.user.create({
      data: { ...props, id, registered_at: new Date().toISOString() },
    })
    return addedUser
  },
  patch: async (props: MutateProps<Data>) => {
    await updateUserSchema.parse(props)
    const updatedUser = await prisma.user.update({
      where: {
        id: props.id,
      },
      data: {
        email: props?.email,
        name: props?.name,
      },
    })
    return updatedUser
  },
  delete: async (props: Id) => {
    const deletedUsers = await prisma.user.delete({
      where: {
        id: props.id,
      },
    })
    return deletedUsers
  },
}
