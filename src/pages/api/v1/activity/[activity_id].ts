import { handleRequest, activityTable } from '@/hooks/API/prisma'
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

// GET | PATCH | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { activity_id } = req.query
  switch (req.method) {
    case 'GET':
      await handleRequest(() => activityTable.get({ id: activity_id }), res)
      break
    case 'PATCH':
      break
    case 'DELETE':
      break
    default:
      res.status(200).json({})
      break
  }
}
