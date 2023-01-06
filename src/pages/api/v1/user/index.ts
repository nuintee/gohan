import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

// GET | PATCH
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({
    status: 'alive',
    code: 200,
  })
}
