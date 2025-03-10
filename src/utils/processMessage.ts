import { client, clientId } from '../client.js'
import { PROCESSED_MESSAGES_KEY } from '../contants.js'
import type { SortedSetEntry } from '../types/index.js'
import { messageSchema } from '../validations/index.js'
import { safeParseJson } from './safeParseJson.js'

// export const handleMessage = (rawMessage: string) => {
//     const result = safeParseJson(messageSchema, rawMessage)

//     if (!result.success) return rawMessage

//     return result.data
// }

export const processMessage = async (message: SortedSetEntry) => {
    const result = safeParseJson(messageSchema, message.value)

    if (result.success) {
        await client.xAdd(PROCESSED_MESSAGES_KEY, '*', {
            ...result.data,
            proccessed_by: clientId,
        })
        console.log(`Processed message: ${result.data.message_id}`)
    }
}
