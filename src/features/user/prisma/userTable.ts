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
  add: async (props: Data) => {
    const required_fields = ['email', 'username']

    handleRequired(required_fields, props)

    const id = randomUUID()
    const addedUser = await prisma.user.create({
      data: { ...props, id, registered_at: new Date().toISOString() },
    })
    return addedUser
  },
  patch: async (props: MutateProps<Data>) => {
    const updatedUser = await prisma.user.update({
      where: {
        id: props.id,
      },
      data: {
        email: props?.email,
        username: props?.username,
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
