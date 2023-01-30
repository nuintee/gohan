import type { NextApiRequest, NextApiResponse } from 'next'

import { userTable } from '@/features/user/prisma/userTable'

// GET | POST
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        const addedUser = await userTable.add(req.body)
        res.status(200).json(addedUser)
        break
      case 'GET':
        const fetchedUsers = await userTable.getAll(req.query)
        res.status(200).json(fetchedUsers)
        break
      default:
        res.status(405).json({ message: 'Invalid Method', code: 405, method: req.method })
        break
    }
  } catch (error) {
    res.status(500).json({ message: JSON.parse(error?.message), code: 500 })
  }
}
