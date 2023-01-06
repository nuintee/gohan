import prisma from '@/lib/prisma'
import { randomUUID } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  username: string
  email: string
}

const user = {
  add: async (props: Data) => {
    const id = randomUUID()
    const addedUser = await prisma.user.create({
      data: { ...props, id, registered_at: new Date().toISOString() },
    })
    return addedUser
  },
  upsert: async (props: Data) => {
    const uuid = randomUUID()
    await prisma.user.upsert({
      where: { id: uuid },
      update: {},
      create: { ...props, registered_at: new Date().toISOString() },
    })
    return props
  },
}

// GET | POST
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      const id = randomUUID()
      const data = {
        id,
        email: 'SHO@gmail.com',
        username: 'SHO',
        registered_at: new Date().toISOString(),
      }
      await prisma.user.create({ data })
      res.status(200).json(data)
      break
    case 'GET':
      const all = await prisma.user.findMany()
      res.status(200).json(all)
      break
    default:
      break
  }
}
