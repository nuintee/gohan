// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Coords } from '@/constants/coords'
import type { NextApiRequest, NextApiResponse } from 'next'

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { profileType, start, end } = req.query

  const base_coordinates = encodeURIComponent(`${start};${end}`)
  const profile = `mapbox/${profileType || 'walking'}`
  const baseURL = `https://api.mapbox.com/directions/v5/${profile}/${base_coordinates}?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxAccessToken}`

  try {
    const query = await fetch(baseURL)
    const data = await query.json()
    const coordinates = data?.routes[0].geometry.coordinates
    res.status(200).json({ data, coordinates })
  } catch (error) {
    res.status(500).json(error)
  }
}
