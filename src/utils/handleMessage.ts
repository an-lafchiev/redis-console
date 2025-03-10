import { client } from '../client.js'
import { SEEN_MESSAGES_KEY, SORTED_SET_KEY } from '../contants.js'
import { processMessage } from './processMessage.js'

export async function handleMessage(rawMessage: string) {
    const newMessage = await client.sAdd(SEEN_MESSAGES_KEY, rawMessage)
    const timestamp = Date.now()

    if (newMessage) {
        await client.zAdd(SORTED_SET_KEY, { score: timestamp, value: rawMessage })
    }

    const message = await client.zPopMin(SORTED_SET_KEY)

    if (message) {
        await processMessage(message)
    }
}
