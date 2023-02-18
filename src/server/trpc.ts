import { TRPCError, initTRPC } from '@trpc/server'
import { createContext } from './context'

const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const middleware = t.middleware
export const procedure = t.procedure
