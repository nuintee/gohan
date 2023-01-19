// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import routeData from '@/data/route/index.json'

type Data = {
  name: string
}

const gcpKey = process.env.NEXT_PUBLIC_GCP_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const latitude = req.query?.latitude
  const longitude = req.query?.longitude
  const place_id = req.query?.place_id

  const nearByURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=500&types=food&opennow=true&key=${gcpKey}`
  const detailsURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${gcpKey}`

  const endpoint = place_id ? detailsURL : nearByURL

  try {
    const query = await fetch(endpoint)
    const data = await query.json()

    // return random one

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
