import type { NextApiRequest, NextApiResponse } from 'next'
import { handleRequest, userTable, Response } from '@/hooks/API/prisma'

type Data = {
  username: string
  age?: number
}

const findMissingProperty = (base: Data, given: Data) => {
  const missingProperties: string[] = []

  Object.keys(base).forEach((k) => {
    const hasFound = given.hasOwnProperty(k)
    if (hasFound) return
    missingProperties.push(k)
  })

  return missingProperties
}

// GET | POST
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const activate = Boolean(req.query.activate)

  try {
    if (activate) throw new Error('Error')
    res.status(200).json({})
  } catch (error) {
    res.status(500).json({ message: error?.message })
  }
}
