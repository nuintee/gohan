import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { user_id } = req.query
  switch (req.method) {
    case 'POST':
      const posted = await prisma.activity.create({
        data: {
          user_id,
          place_id: 'de',
          is_liked: true,
          discovered_at: new Date().toISOString(),
        },
      })
      res.json(posted)
      break
    case 'GET':
      break
    default:
      res.status(200).json({})
      break
  }
}
