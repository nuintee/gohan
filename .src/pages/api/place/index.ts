// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PlacesAPI, DetailsAPI, ResultsEntity } from '@/hooks/context/Restaurants/types'

import { fetchNearRestaurants } from '@/utils/place'

type Data = ResultsEntity | PlacesAPI | DetailsAPI

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const latitude = req.query?.latitude as string | undefined
  const longitude = req.query?.longitude as string | undefined

  try {
    const data = await fetchNearRestaurants({ latitude, longitude })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
