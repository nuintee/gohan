// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import mapData from '@/data/places/index.json'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const onlyOpenNow = mapData.results.filter((map, index) => map.opening_hours?.open_now)
  const randomIndex = Math.floor(Math.random() * onlyOpenNow.length)
  const randomOne = onlyOpenNow[randomIndex]

  return res.status(200).json(randomOne)
}
