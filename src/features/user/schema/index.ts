import { z } from 'zod'

export const addUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
})

export const updateUserSchema = z.object({
  name: z.optional(z.string()),
})

export type UpdateUserProps = z.infer<typeof updateUserSchema>

export type AddUserProps = z.infer<typeof addUserSchema>
