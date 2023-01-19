import NextAuth from 'next-auth'

import { User } from '@prisma/client'

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>
  export default content
}

declare module 'next-auth' {
  interface Session {
    user: User
  }
}
