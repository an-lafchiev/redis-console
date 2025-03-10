import { client } from './client.js'
import { CHANNEL_KEY, CONSUMER_LIST } from './contants.js'
import { handleMessage } from './utils/handleMessage.js'

export async function registerConsumerId(consumerId: string) {
    try {
        await client.lPush(CONSUMER_LIST, consumerId)
    } catch (e: unknown) {
        console.error(`Error adding consumer ID: ${e}`)
    }
}

export async function removeConsumerId(consumerId: string) {
    try {
        await client.lRem(CONSUMER_LIST, 0, consumerId)
    } catch (e: unknown) {
        console.error(`Error removinng consumer ID: ${e}`)
    }
}

export async function createSubscriber(consumerId: string) {
    const subscriber = client.duplicate()
    await subscriber.connect()

    await registerConsumerId(consumerId)
    await subscriber.subscribe(CHANNEL_KEY, async (message) => {
        await handleMessage(message)
    })
}
