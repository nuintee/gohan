import type { NextApiRequest, NextApiResponse } from 'next'
import { handleRequest, userTable, Response } from '@/hooks/API/prisma'

// GET | PATCH | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const user_id = req.query.user_id as string
  switch (req.method) {
    case 'GET':
      await handleRequest(() => userTable.get({ id: user_id }), res)
      break
    case 'PATCH':
      await handleRequest(() => userTable.patch({ id: user_id, ...req.body }), res)
      break
    case 'DELETE':
      await handleRequest(() => userTable.delete({ id: user_id }), res)
      break
    default:
      break
  }
}
