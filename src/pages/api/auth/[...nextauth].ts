import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'
import prisma from '@/libs/prisma'

// env
import { IS_DEVMODE, GCP_CLIENT_ID, GCP_CLIENT_SECRET, APP_SECRET } from '@/config/env'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'

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
      async authorize(credentials, req) {
        const user = { id: 'X', name: 'Guest', email: 'guestemail@example.com' }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token

      return session
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)
