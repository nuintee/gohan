// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from '@/libs/axios'

// env
import { MAPBOX_PUBLIC_TOKEN } from '@/config/env'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { profileType, start, end } = req.query

  const base_coordinates = encodeURIComponent(`${start};${end}`)
  const profile = `mapbox/${profileType || 'walking'}`
  const baseURL = `https://api.mapbox.com/directions/v5/${profile}/${base_coordinates}?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${MAPBOX_PUBLIC_TOKEN}`

  try {
    const data = await axios.get(baseURL)
    const coordinates = data?.routes[0].geometry.coordinates
    res.status(200).json({ data, coordinates })
  } catch (error) {
    res.status(500).json(error)
  }
}
