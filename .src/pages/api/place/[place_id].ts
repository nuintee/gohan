// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import routeData from '@/data/route/index.json'
import { PlacesAPI, DetailsAPI, ResultsEntity } from '@/hooks/context/Restaurants/types'

import { fetchNearRestaurants } from '@/utils/place'

type Data = ResultsEntity | PlacesAPI | DetailsAPI

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const latitude = req.query?.latitude
  const longitude = req.query?.longitude

  try {
    const data = await fetchNearRestaurants({ latitude, longitude })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}