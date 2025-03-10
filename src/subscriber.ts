import { client } from './client.js'
import { CHANNEL, CONSUMER_LIST } from './contants.js'
import { handleMessage } from './utils/handleMessage.js'

async function registerConsumer(consumerId: string) {
    await client.lPush(CONSUMER_LIST, consumerId)
}

export async function createSubscriber(consumerId: string) {
    const subscriber = client.duplicate()
    await subscriber.connect()

    await registerConsumer(consumerId)
    await subscriber.subscribe(CHANNEL, async (message) => {
        handleMessage(message)
    })
}
