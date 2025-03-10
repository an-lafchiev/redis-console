import { client, clientId } from '../client.js'
import { PROCESSED_MESSAGES_KEY, SORTED_SET_KEY } from '../contants.js'
import { incrementProcessedMessages, setStartTime } from '../metrics.js'
import { messageSchema } from '../validations/index.js'
import { safeParseJson } from './safeParseJson.js'

export const processMessage = async () => {
    const message = await client.bzPopMin(SORTED_SET_KEY, 5)
    if (!message) {
        return
    }

    setStartTime()
    const result = safeParseJson(messageSchema, message.value)

    if (result.success) {
        await client.xAdd(PROCESSED_MESSAGES_KEY, '*', {
            ...result.data,
            proccessed_by: clientId,
            processed_at: new Date().toISOString(),
        })

        await client.incr('global:processedMessages')
        incrementProcessedMessages()
    }
}
