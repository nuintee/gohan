import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'
import prisma from '@/libs/prisma'

// env
import { IS_DEVMODE, GCP_CLIENT_ID, GCP_CLIENT_SECRET, APP_SECRET } from '@/config/env'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import { guestUser } from '@/data/user'
import { randomUUID } from 'crypto'

export const authOptions: NextAuthOptions = {
  debug: IS_DEVMODE,
  secret: APP_SECRET,
  providers: [
    GoogleProvider({
      clientId: GCP_CLIENT_ID,
      clientSecret: GCP_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Guest',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize() {
        const LOCALSTORATE_KEY = 'device_id'
        let id = randomUUID()

        localStorage.setItem(LOCALSTORATE_KEY, id)

        const user = await prisma.user.upsert({
          where: {
            email: guestUser.email as string,
          },
          create: { ...guestUser, id },
          update: { ...guestUser, id },
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
      console.log({ uEmail: token, gEmail: guestUser.email })
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

export default NextAuth(authOptions)
