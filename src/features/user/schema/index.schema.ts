import { z } from 'zod'

export const USER_ID_SCHEMA = z.string()

export const MUTABLE_USER_DATA_SCHEMA = z.object({
  name: z.string(),
})
