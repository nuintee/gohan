import { APP_SECRET, GCP_API_KEY } from '@/config/env'
import axios from '@/libs/axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const place_id = req.query?.place_id as string
  const secret = req.headers['x-app-secret']

  if (secret !== APP_SECRET) {
    res.status(403).json({
      code: 'UNAUTHED_REQUEST',
    })
  } else {
    res.status(200).json({
      place_id,
    })
  }
}
