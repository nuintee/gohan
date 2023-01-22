import { activityTable, handleRequest, Response } from '@/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

// GET | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const user_id = req.query.user_id as string

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
