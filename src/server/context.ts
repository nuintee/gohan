import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

// lib
import prisma from '@/libs/prisma'

const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(
    ctx.req,
    ctx.res,
    nextAuthOptions(ctx.req as NextApiRequest, ctx.res as NextApiResponse),
  )
}

export async function createContext(opts: CreateNextContextOptions) {
  const session = await getServerAuthSession(opts)
  return {
    session,
    prisma,
    req: opts.req,
    res: opts.res,
  }
}
