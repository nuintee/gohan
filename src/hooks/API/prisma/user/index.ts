import prisma from '@/lib/prisma'
import { randomUUID } from 'crypto'

type Data = {
  username: string
  email: string
}

type MutateProps = {
  id: string
} & Data

const userTable = {
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
}

export default userTable
