import { getServerSession } from 'next-auth'

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
    }
  }
}

declare global {
  interface Array<T> {
    random(): T
  }
}
