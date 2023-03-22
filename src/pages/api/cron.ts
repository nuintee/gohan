import axios from '@/libs/axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(`https://${process.env.SUPABASE_REF}.functions.supabase.co/ping`)

  const pingRequest = await axios.post(
    url.toString(),
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
    },
  )

  res.status(pingRequest.status).json(pingRequest.data)
}
