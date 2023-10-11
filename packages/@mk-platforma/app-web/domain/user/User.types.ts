import { z } from "zod"

export const AvataryStyle_zod = z.object({
  background: z.string().optional(),
  color: z.string().optional(),
})

export type AvatarStyle = z.infer<typeof AvataryStyle_zod>
