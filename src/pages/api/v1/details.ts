// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// controllers
import { getRestaurantDetails } from '@/features/restaurants/controllers/getRestaurantDetails'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const place_id = req.query?.place_id as string
  const onlyNeeded = req.query?.onlyNeeded !== 'false'

  if (req.method !== 'GET')
    res.status(405).json({ message: 'Invalid method', code: 405, method: req.method })

  try {
    const data = await getRestaurantDetails({ place_id, onlyNeeded })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
