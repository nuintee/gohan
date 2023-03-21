import { getServerSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'
import { getProviders } from 'next-auth/react'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string
      id: string
      email: string
      image?: string
      registered_at?: Date
    } & DefaultSession['user']
  }

  interface JWT {
    user: {
      name: string
      id: string
      email: string
      image?: string
      registered_at?: Date
    } & DefaultJWT
  }
}

declare global {
  interface Array<T> {
    random(): T
  }

  var prisma: PrismaClient
}
