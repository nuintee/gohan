import { initTRPC } from '@trpc/server'
import { createContext } from './context'

// transformer
import superjson from 'superjson'

const t = initTRPC.context<typeof createContext>().create({ transformer: superjson })

export const router = t.router
export const middleware = t.middleware
export const procedure = t.procedure
