// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import routeData from '@/data/route/index.json'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { place_id } = req.query
  const foundRoute = routeData.find((v) => v.place_id === place_id)

  if (!foundRoute) return res.status(500).json([])

  res.status(200).json(foundRoute?.routes)
}
