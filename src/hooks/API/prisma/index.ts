import { Prisma } from '@prisma/client'
import { NextApiResponse } from 'next'
import userTable from './user'

const handleRequest = async (action: Function, res: NextApiResponse<Data>) => {
  try {
    const result = await action()
    res.status(200).json(result)
  } catch (error) {
    let message = ''
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          message =
            'There is a unique constraint violation, a new user cannot be created with this email'
          break
        default:
          break
      }
      res.status(500).json({ ...error, message })
    }
    res.status(500).json(error)
  }
}

export { userTable, handleRequest }
