import { handleRequest, activityTable } from '@/hooks/API/prisma'
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      await handleRequest(() => activityTable.getAll(req.query), res)
      break
    default:
      break
  }
}
