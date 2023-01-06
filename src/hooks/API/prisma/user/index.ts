import prisma from '@/lib/prisma'
import { randomUUID } from 'crypto'

type Data = {
  username: string
  email: string
}

type UserKey = {
  id: string | string[] | undefined
}

type ListFilter = {
  limit?: number
  offset?: number
}

type MutateProps = UserKey & Data
type GetListProps = UserKey & ListFilter

const userTable = {
  get: async (props: UserKey) => {
    const fetchedUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: props.id,
      },
    })
    return fetchedUser
  },
  getAll: async (props: GetListProps) => {
    const filter = {
      ...(props?.offset && { skip: Number(props?.offset) }),
      ...(props?.limit && { take: Number(props?.limit) }),
    }

    const fetchedUsers = await prisma.user.findMany(filter)
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
