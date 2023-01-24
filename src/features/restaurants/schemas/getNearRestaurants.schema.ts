import { z } from 'zod'

export const Schema = z.object({
  latitude: z
    .string()
    .transform((v) => Number(v))
    .refine(
      (v) => {
        return v >= -90 && v <= 90
      },
      { message: 'latitude must be between -90 and 90' },
    ),
  longitude: z
    .string()
    .transform((v) => Number(v))
    .refine(
      (v) => {
        return v >= -180 && v <= 180
      },
      { message: 'longitude must be between -180 and 180' },
    ),
  randomOne: z.optional(z.string().transform((v) => Boolean(v))),
})

export type Props = z.infer<typeof Schema>
