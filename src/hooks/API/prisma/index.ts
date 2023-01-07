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

const handleRequired = <T extends {}>(fields: string[], src: T) => {
  const missing_fields: string[] = []

  fields.forEach((field) => {
    if (src.hasOwnProperty(field)) return
    missing_fields.push(field)
  })

  if (missing_fields.length)
    throw new Error(`${missing_fields} ${missing_fields.length > 1 ? 'are' : 'is'} required`)
}

const _prismaErrors = [
  {
    code: 'P1000',
    message:
      'Authentication failed against database server at {database_host}, the provided database credentials for {database_user} are not valid. Please make sure to provide valid database credentials for the database server at {database_host}.',
  },
  {
    code: 'P2002',
    message: 'There is a unique constraint violation, a new user cannot be created with this email',
  },
  {
    code: 'P2003',
    message: 'Foreign key constraint failed on the field: {field_name}',
  },
]

const _prismaErrorMapper = (error: Prisma.PrismaClientKnownRequestError) => {
  let message = ''
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    _prismaErrors.forEach((e) => {
      if (e.code === error.code) {
        message = e.message
      }
    })
  }
  return message
}

const handleRequest = async (action: Function, res: NextApiResponse<Response>) => {
  try {
    const result = await action()
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const message = _prismaErrorMapper(error)
      res.status(500).json({ ...error, message })
    }
    res.status(500).json({
      code: 500,
      message: error?.message,
    })
  }
}

export { userTable, activityTable, handleRequest, resultFilter, handleRequired }
