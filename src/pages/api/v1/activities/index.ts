import { handleRequest, activityTable } from '@/hooks/API/prisma'
import prisma from '@/lib/prisma'
import { randomUUID } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

// GET | POST | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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
