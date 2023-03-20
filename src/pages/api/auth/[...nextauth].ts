import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'
import prisma from '@/libs/prisma'

// env
import { IS_DEVMODE, GCP_CLIENT_ID, GCP_CLIENT_SECRET, APP_SECRET } from '@/config/env'

import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  debug: IS_DEVMODE,
  secret: APP_SECRET,
  providers: [
    GoogleProvider({
      clientId: GCP_CLIENT_ID,
      clientSecret: GCP_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async redirect({ url, baseUrl }) {
      if (url === `${baseUrl}/cancelation`) {
        return baseUrl
      } else {
        return url
      }
    },
    async session({ session, user }) {
      session.user = user
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/signin',
  },
}

export default NextAuth(authOptions)
