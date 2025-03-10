import { client, clientId } from '../client.js'
import { PROCESSED_MESSAGES_KEY, SORTED_SET_KEY } from '../contants.js'
import { incrementProcessedMessages, setStartTime } from '../metrics.js'
import { messageSchema } from '../validations/index.js'
import { safeParseJson } from './safeParseJson.js'

export const processMessage = async (connection: typeof client) => {
    const maxRetries = 5
    let retries = 0

    while (maxRetries > retries) {
        const message = await connection.bzPopMin(SORTED_SET_KEY, 5)

        if (message) {
            setStartTime()
            const result = safeParseJson(messageSchema, message.value)

            if (result.success) {
                await connection.xAdd(PROCESSED_MESSAGES_KEY, '*', {
                    ...result.data,
                    proccessed_by: clientId,
                    processed_at: new Date().toISOString(),
                })

                await connection.incr('global:processedMessages')
                incrementProcessedMessages()
            }
        } else {
            retries++
        }
    }

    if (retries >= maxRetries) {
        return true
    }
}
