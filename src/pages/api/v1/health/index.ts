import type { NextApiRequest, NextApiResponse } from 'next'
import { Response } from '@/utils/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  res.status(200).json({ status: 'ok' })
}
