// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import getNearRestaurants from '@/features/restaurants/controllers/getNearRestaurants'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const latitude = req.query?.latitude as string
  const longitude = req.query?.longitude as string

  if (req.method !== 'GET')
    res.status(405).json({ message: 'Invalid method', code: 405, method: req.method })

  try {
    const data = await getNearRestaurants({ latitude, longitude })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
