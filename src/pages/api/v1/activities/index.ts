import { handleRequest, activityTable, Response } from '@/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

// GET | POST | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  switch (req.method) {
    case 'GET':
      await handleRequest(() => activityTable.getAll(req.query), res)
      break
    case 'POST':
      await handleRequest(() => activityTable.add(req.body), res)
      break
    default:
      break
  }
}
