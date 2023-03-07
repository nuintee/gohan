import { GCP_API_KEY } from '@/config/env'
import axios from '@/libs/axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL('https://maps.googleapis.com/maps/api/place/photo')
  url.searchParams.append('maxwidth', '400')
  url.searchParams.append('photo_reference', req.query?.photo_reference as string)
  url.searchParams.append('key', GCP_API_KEY)

  const response = await axios.get(url.toString(), {
    responseType: 'arraybuffer',
    validateStatus: function (status) {
      return status === 403 || status === 200
    },
  })

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Content-Disposition', `inline; filename=image.png`)
  res.send(Buffer.from(response.data))
}
