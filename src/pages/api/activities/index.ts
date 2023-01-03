// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { activitiesTable, create, _deleteActivity } from '@/hooks/API/activities'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      create({
        hi: 2,
      })
      res.status(200).json({})
      break
    case 'GET':
      const all = activitiesTable.getAll()
      res.status(200).json(all)
      break
    case 'DELETE':
      _deleteActivity('4', 4)
      res.status(200).json({})
      break
    default:
      break
  }
}
