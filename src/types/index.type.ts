import { getProviders } from 'next-auth/react'

export type Providers = Awaited<ReturnType<typeof getProviders>> | undefined
