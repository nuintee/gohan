// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import routeData from '@/data/route/index.json'
import { PlacesAPI, DetailsAPI, ResultsEntity } from '@/hooks/context/Restaurants/types'

type Data = ResultsEntity | PlacesAPI | DetailsAPI

type RequiredParams = {
  place_id?: string
  latitude?: string
  longitude?: string
}

type FetchResponse<T extends DetailsAPI | PlacesAPI> = T

const gcpKey = process.env.NEXT_PUBLIC_GCP_API_KEY

async function _handleFetch(url: string) {
  const query = await fetch(url)
  const data = await query.json()
  return data
}

async function _fetchNearRestaurants({ latitude, longitude }) {
  if (!latitude || !longitude) throw new Error('invalid parameters')

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=500&types=food&opennow=true&key=${gcpKey}`
  const data: PlacesAPI = await _handleFetch(url)
  return data
}

async function _fetchRestaurantDetail({ place_id }) {
  if (!place_id) throw new Error('invalid parameters')

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${gcpKey}`
  const data: DetailsAPI = await _handleFetch(url)
  return data
}

async function _fetchPlace<T extends PlacesAPI | DetailsAPI>(params: RequiredParams) {
  const latitude = params?.latitude
  const longitude = params?.longitude
  const place_id = params?.place_id

  const url = params?.place_id
    ? `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${gcpKey}`
    : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=500&types=food&opennow=true&key=${gcpKey}`
  const data: T = await _handleFetch(url)
  return data
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const latitude = req.query?.latitude
  const longitude = req.query?.longitude
  const place_id = req.query?.place_id as string | undefined

  try {
    const data = await _fetchPlace({ place_id, latitude, longitude })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
