import { Prisma } from '@prisma/client'
import { NextApiResponse } from 'next'
import userTable from './user'
import activityTable from './activity'
import { ListFilter } from './types'
import type { User, Activity } from '@prisma/client'

type Data = User | User[] | Activity | Activity[]

type Error = {
  message?: string | undefined
  code?: number | undefined
}

type Status = {
  status: string
}

export type Response = Data | Error | Status

const resultFilter = (listFilters: ListFilter) => {
  const { offset, limit, ...rest } = listFilters

  return {
    ...rest,
    ...(listFilters?.offset && { skip: Number(listFilters?.offset) }),
    ...(listFilters?.limit && { take: Number(listFilters?.limit) }),
  }
}

const handleRequired = (fields: string[], src: Data) => {
  const missing_fields = fields.map((field) => (!src.hasOwnProperty(field) ? field : null))

  if (missing_fields.length) throw new Error(`${missing_fields} is required`)
}

const handleRequest = async (action: Function, res: NextApiResponse<Response>) => {
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
    res.status(500).json({
      code: 500,
      message: error?.message,
    })
  }
}

export { userTable, activityTable, handleRequest, resultFilter, handleRequired }
