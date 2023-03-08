import { APP_SECRET } from '@/config/env'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const place_id = req.query?.place_id as string
  const secret = req.headers['x-app-secret']

  if (secret !== APP_SECRET) return res.status(403).json({ code: 'UNAUTHED_REQUEST' })

  try {
    await res.revalidate(`/details/${place_id}`)
    res.status(200).json({
      revalidated: true,
    })
  } catch (error) {
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
    })
  }
}
