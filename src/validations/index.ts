import { z } from 'zod'

export const messageSchema = z.object({
    message_id: z.string().min(32).max(36),
})

export type Message = z.infer<typeof messageSchema>
