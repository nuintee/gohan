import { z } from 'zod'

const Schema = z.object({
  place_id: z.string(),
})

export type Props = z.infer<typeof Schema>

export { Schema }
