import type { NextApiRequest, NextApiResponse } from 'next'
import { Response } from '@/hooks/API/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  res.status(200).json({
    message: 'alive',
    code: 200,
  })
}
