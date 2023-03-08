import { NextApiResponse } from 'next'

export default function handler(req, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'max-age=60000, s-maxage=60000, stale-while-revalidate')
  res.status(200).json({ r: new Date().toISOString() })
}
