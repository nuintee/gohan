import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handleRequest, userTable, Response } from '@/hooks/API/prisma'

type Data = {
  name: string
}

// GET | PATCH | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { userId } = req.query
  switch (req.method) {
    case 'GET':
      await handleRequest(() => userTable.get({ id: userId }), res)
      break
    case 'PATCH':
      await handleRequest(() => userTable.patch({ id: userId, ...req.body }), res)
      break
    case 'DELETE':
      await handleRequest(() => userTable.delete({ id: userId }), res)
      break
    default:
      break
  }
}
