import { activityTable, handleRequest } from '@/hooks/API/prisma'
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

// GET | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { user_id } = req.query
  switch (req.method) {
    case 'GET':
      await handleRequest(() => activityTable.getUserAll({ user_id, ...req.query }), res)
      break
    case 'DELETE':
      await handleRequest(() => activityTable.deleteUserAll({ user_id }), res)
      break
    default:
      res.status(200).json({})
      break
  }
}
