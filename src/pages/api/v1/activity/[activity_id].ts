import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { activity_id } = req.query
  switch (req.method) {
    case 'GET':
      const result = await prisma.activity.findUnique({
        where: {
          id: Number(activity_id),
        },
      })
      res.json(result)
      break
    default:
      break
  }
}
