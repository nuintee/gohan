import prisma from '@/lib/prisma'
import { randomUUID } from 'crypto'
import { resultFilter } from '..'
import { Id, MutateProps, ListFilter } from '../types'

type Data = {
  username: string
  email: string
}

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
    const required_fields = ['email', 'username']

    const missing_fields = required_fields.map((field) =>
      !props.hasOwnProperty(field) ? field : null,
    )

    if (missing_fields.length) throw new Error(`${missing_fields} is required`)

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

export default userTable
