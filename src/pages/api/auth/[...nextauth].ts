import NextAuth from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import type { NextAuthOptions } from 'next-auth'
// import prisma from '@/libs/prisma'

// env
import { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_ISSUER } from '@/config/env'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import * as Prisma from '@prisma/client'

const prisma = new Prisma.PrismaClient()

// export const authOptions: NextAuthOptions =
//   // your configs
//   {
//     providers: [
//       CredentialsProvider({
//         // The name to display on the sign in form (e.g. "Sign in with...")
//         name: 'Credentials',
//         // `credentials` is used to generate a form on the sign in page.
//         // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//         // e.g. domain, username, password, 2FA token, etc.
//         // You can pass any HTML attribute to the <input> tag through the object.
//         credentials: {
//           username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
//           password: { label: 'Password', type: 'password' },
//         },
//         async authorize(credentials, req) {
//           // Add logic here to look up the user from the credentials supplied
//           const user = { username: 'DEVUSER', email: 'jsmith@example.com' }
//           const password = 'DEV'

//           if (credentials?.username === user.username && credentials.password === password) {
//             // Any object returned will be saved in `user` property of the JWT
//             return user
//           } else {
//             // If you return null then an error will be displayed advising the user to check their details.
//             return null

//             // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//           }
//         },
//       }),
//     ],
//     callbacks: {
//       async jwt({ token, user, account, profile, isNewUser }) {
//         user && (token.user = user)
//         return token
//       },
//       async session({ session, token, user }) {
//         session = {
//           ...session,
//           user: {
//             id: process.env.DEV_USER_ID,
//             ...session.user,
//           },
//         }
//         return session
//       },
//     },
//     adapter: PrismaAdapter(prisma),
//   }
export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      issuer: AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    },
    async session({ session, user, token }) {
      session.user = user
      return session
    },
    async signOut(e) {
      console.log('SIGNOUT')
    },
  },
  adapter: PrismaAdapter(prisma),
}

export default NextAuth(authOptions)
