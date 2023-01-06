import { handleRequest } from '@/hooks/API/prisma'
import activityTable from '@/hooks/API/prisma/activity'
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
