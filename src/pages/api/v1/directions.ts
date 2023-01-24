// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// controllers
import { getDirections } from '@/features/directions/controllers/getDirections'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const profileType = req.query?.profileType as string
  const start = req.query?.start as string
  const end = req.query?.end as string

  if (req.method !== 'GET')
    res.status(405).json({ message: 'Invalid method', code: 405, method: req.method })

  try {
    const data = await getDirections({
      profileType,
      start,
      end,
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
