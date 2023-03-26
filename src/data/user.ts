import { User } from '@prisma/client'

export const user: User = {
  id: '346acf04-b701-4c08-82d4-9866f7a70891',
  email: 'testuser@example.com',
  name: 'testuser',
  emailVerified: new Date(),
  registered_at: new Date(),
  image: null,
}

export const guestUser: User = {
  id: '13ba7b27-76d1-4f9c-b701-11ee930d70d9',
  email: 'guest@example.com',
  name: 'guestuser',
  emailVerified: new Date(),
  registered_at: new Date(),
  image: null,
}
