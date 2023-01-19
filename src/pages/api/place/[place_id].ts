// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import routeData from '@/data/route/index.json'
import { PlacesAPI, DetailsAPI, ResultsEntity } from '@/hooks/context/Restaurants/types'

type Data = ResultsEntity | PlacesAPI | DetailsAPI

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const latitude = req.query?.latitude
  const longitude = req.query?.longitude
  const place_id = req.query?.place_id as string | undefined

  try {
    res.status(200).json({ message: 'ee' })
  } catch (error) {
    res.status(500).json(error)
  }
}
