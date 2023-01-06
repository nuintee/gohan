import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handleRequest, userTable } from '@/hooks/API/prisma'

type Data = {
  name: string
}

// GET | PATCH | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId } = req.query
  switch (req.method) {
    case 'GET':
      await handleRequest(
        () =>
          prisma.user.findUnique({
            where: {
              id: userId,
            },
          }),
        res,
      )
      break
    case 'PATCH':
      await handleRequest(() => userTable.patch({ id: userId, ...req.body }), res)
      break
    case 'DELETE':
      await handle_request(
        () =>
          prisma.user.delete({
            where: {
              id: userId,
            },
          }),
        res,
      )
      break
    default:
      break
  }
}
