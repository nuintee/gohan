import { factory, primaryKey, nullable, oneOf, manyOf } from '@mswjs/data'

// Prisma
import { User, Prisma, Activity } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ModelDefinitionValue } from '@mswjs/data/lib/glossary'

type FactoryModel<T> = Record<keyof T, ModelDefinitionValue>

const user: FactoryModel<User & { activity: [] }> = {
  id: () => randomUUID(),
  name: () => 'DEV_USER',
  email: () => 'devuser@example.com',
  emailVerified: nullable(() => new Date().toISOString()),
  image: () => '',
  registered_at: () => new Date().toISOString(),
  activity: oneOf('activity'),
}

const activity: FactoryModel<Activity> = {
  id: () => randomUUID(),
  is_liked: () => false,
  userId: oneOf('user'),
  place_id: () => '',
  discovered_at: () => new Date().toISOString(),
}

const db = factory({
  user,
  activity,
})

export default db
