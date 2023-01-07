import prisma from '@/lib/prisma'
import { randomUUID } from 'crypto'
import { resultFilter, ListFilter } from '..'
import { Id } from '../types'

type Data = {
  username: string
  email: string
}

type MutateProps = Id<Data>

const userTable = {
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
    const id = randomUUID()
    const addedUser = await prisma.user.create({
      data: { ...props, id, registered_at: new Date().toISOString() },
    })
    return addedUser
  },
  patch: async (props: MutateProps) => {
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
  delete: async (props: UserKey) => {
    const deletedUsers = await prisma.user.delete({
      where: {
        id: props.id,
      },
    })
    return deletedUsers
  },
}

export default userTable
