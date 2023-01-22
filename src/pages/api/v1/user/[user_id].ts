import type { NextApiRequest, NextApiResponse } from 'next'

import { userTable } from '@/features/user/prisma/userTable'

// GET | PATCH | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user_id = req.query.user_id as string
  try {
    switch (req.method) {
      case 'GET':
        const fetchedUser = await userTable.get({ id: user_id })
        res.status(200).json(fetchedUser)
        break
      case 'PATCH':
        const updatedUser = await userTable.patch({ id: user_id, ...req.body })
        res.status(200).json(updatedUser)
        break
      case 'DELETE':
        const deletedUser = await userTable.delete({ id: user_id })
        res.status(200).json(deletedUser)
        break
      default:
        res.status(405).json({ message: 'Invalid Method', code: 405, method: req.method })
        break
    }
  } catch (error) {
    res.status(500).json({ message: JSON.parse(error?.message), code: 500 })
  }
}
