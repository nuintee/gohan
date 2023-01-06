import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handle_request, userTable } from '@/hooks/API/prisma'

type Data = {
  name: string
}

// GET | PATCH | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId } = req.query
  switch (req.method) {
    case 'GET':
      await handle_request(
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
      await handle_request(
        () =>
          prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              email: req.body?.email,
              username: req.body?.username,
            },
          }),
        res,
      )
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
