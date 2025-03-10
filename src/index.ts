import { connectRedis, clientId } from './client.js'
import { createSubscriber } from './subscriber.js'

async function startConsumer() {
    await connectRedis()
    createSubscriber(clientId)
}

startConsumer().catch((e: unknown) => {
    console.error(e)
    process.exit(1)
})
