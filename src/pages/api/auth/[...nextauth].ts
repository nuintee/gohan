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

import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next'
import { randomUUID } from 'crypto'

// export const authOptions: NextAuthOptions = {
//   debug: IS_DEVMODE,
//   secret: APP_SECRET,
//   providers: [
//     GoogleProvider({
//       clientId: GCP_CLIENT_ID,
//       clientSecret: GCP_CLIENT_SECRET,
//     }),
//     Credentials({
//       name: 'Guest',
//       credentials: {},
//       async authorize() {
//         const user = await prisma.user.upsert({
//           where: {
//             email: guestUser.email as string,
//           },
//           create: guestUser,
//           update: {},
//         })

//         if (user) {
//           return user
//         } else {
//           return null
//         }
//       },
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   callbacks: {
//     async jwt({ token, user }) {
//       const isGuest = token?.id === guestUser.id
//       return { ...token, ...user, isGuest }
//     },
//     async session({ session, token }) {
//       session.user = token

//       return session
//     },
//   },
//   pages: {
//     signIn: '/signin',
//     error: '/error',
//   },
//   session: {
//     strategy: 'jwt',
//   },
// }

// export default NextAuth(authOptions)

type NextAuthOptionsCallback = (req: NextApiRequest, res: NextApiResponse) => NextAuthOptions

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
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
          const user = await prisma.user.upsert({
            where: {
              email: guestUser.email as string,
            },
            create: guestUser,
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
        const isGuest = token?.id === guestUser.id
        return { ...token, ...user, isGuest }
      },
      async session({ session, token }) {
        session.user = token

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
  setCookie('deviceId', randomUUID(), {
    req,
    res,
  })
  return NextAuth(req, res, nextAuthOptions(req, res))
}
