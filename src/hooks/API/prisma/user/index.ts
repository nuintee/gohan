import prisma from '@/lib/prisma'
import { randomUUID } from 'crypto'

type Data = {
  username: string
  email: string
}

const userTable = {
  add: async (props: Data) => {
    const id = randomUUID()
    const addedUser = await prisma.user.create({
      data: { ...props, id, registered_at: new Date().toISOString() },
    })
    return addedUser
  },
}

export default userTable
