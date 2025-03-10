import { connectRedis, clientId } from './client.js'
import { startLogging } from './metrics.js'
import { createSubscriber } from './subscriber.js'

async function startConsumer() {
    await connectRedis()
    startLogging()
    createSubscriber(clientId)
}

startConsumer()
    .then(() => {
        console.log(`Consumer started. Process ID: ${process.pid}`)
    })
    .catch((e: unknown) => {
        console.error(e)
        process.exit(1)
    })
