import NextAuth from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'
import prisma from '@/libs/prisma'

// env
import {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_ISSUER,
  AUTH0_DOMAIN,
  IS_DEVMODE,
} from '@/config/env'

import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  debug: IS_DEVMODE,
  providers: [
    Auth0Provider({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      issuer: AUTH0_ISSUER,
      authorization: {
        params: { prompt: 'login' },
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GCP_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GCP_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    },
    async redirect({ url, baseUrl }) {
      if (url === `${baseUrl}/api/federate-logout`) {
        return `https://${AUTH0_DOMAIN}/v2/logout?returnTo=${baseUrl}&client_id=${AUTH0_CLIENT_ID}&federated`
      } else {
        return url
      }
    },
    async session({ session, user, token }) {
      session.user = user
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
}

export default NextAuth(authOptions)
