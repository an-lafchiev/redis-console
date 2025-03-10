import { client } from '../client.js'
import { SEEN_MESSAGES_KEY, SORTED_SET_KEY } from '../contants.js'

export async function handleMessage(rawMessage: string) {
    const newMessage = await client.sAdd(SEEN_MESSAGES_KEY, rawMessage)
    await client.expire(SEEN_MESSAGES_KEY, 60)

    if (!newMessage) return

    const timestamp = Date.now()
    await client.zAdd(SORTED_SET_KEY, { score: timestamp, value: rawMessage })
}
