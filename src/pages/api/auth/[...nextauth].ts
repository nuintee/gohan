import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'
import prisma from '@/libs/prisma'

// env
import { IS_DEVMODE, GCP_CLIENT_ID, GCP_CLIENT_SECRET, APP_SECRET } from '@/config/env'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import { guestUser } from '@/data/user'
import { NextApiRequest, NextApiResponse } from 'next'

import { getCookie, setCookie } from 'cookies-next'
import { randomUUID } from 'crypto'
import { User } from '@prisma/client'

type NextAuthOptionsCallback = (req: NextApiRequest, res: NextApiResponse) => NextAuthOptions

export const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  return {
    debug: IS_DEVMODE,
    secret: APP_SECRET,
    providers: [
      GoogleProvider({
        clientId: GCP_CLIENT_ID,
        clientSecret: GCP_CLIENT_SECRET,
      }),
      Credentials({
        name: 'Guest',
        credentials: {},
        async authorize() {
          const deviceId = getCookie('deviceId', { req, res })?.toString() || guestUser.id
          const guestCount = await prisma.user.count({
            where: {
              email: {
                contains: '@example.com',
              },
            },
          })
          const guestIndex = guestCount + 1 || deviceId.slice(0, 5)
          const user = await prisma.user.upsert({
            where: {
              id: deviceId as string,
            },
            create: {
              ...guestUser,
              name: `guest${guestIndex}`,
              id: deviceId,
              email: `guest${guestIndex}@example.com`,
            },
            update: {},
          })

          if (user) {
            return user
          } else {
            return null
          }
        },
      }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
      async jwt({ token, user }) {
        const guestRegexp = new RegExp(/guest.+example\.com/g)
        const isGuest = guestRegexp.test(token.email as string)
        return { ...token, ...user, isGuest }
      },
      async session({ session, token, user }) {
        const { iat = '', exp = '', jti = '', sub = '', picture = '', ...restToken } = token
        session.user = { ...user, ...restToken } as User

        return session
      },
    },
    pages: {
      signIn: '/signin',
      error: '/error',
    },
    session: {
      strategy: 'jwt',
    },
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const deviceId = getCookie('deviceId', {
    req,
    res,
  })

  if (!deviceId) {
    setCookie('deviceId', randomUUID(), {
      req,
      res,
    })
  } else {
    setCookie('deviceId', deviceId, {
      req,
      res,
    })
  }

  return NextAuth(req, res, nextAuthOptions(req, res))
}
