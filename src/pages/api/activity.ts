import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      const posted = await prisma.activity.create({
        data: {
          user_id: '1',
          place_id: 'de',
          is_liked: true,
          discovered_at: new Date().toISOString(),
        },
      })
      res.json(posted)
      break
    case 'GET':
      const result = await prisma.activity.findMany()
      res.json(result)
  }
}
