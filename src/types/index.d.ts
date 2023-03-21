import { User } from '@prisma/client'
import { DefaultSession, getServerSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'
import { getProviders } from 'next-auth/react'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session extends DefaultSession {
    user: User
  }
}

declare global {
  interface Array<T> {
    random(): T
  }

  var prisma: PrismaClient
}
