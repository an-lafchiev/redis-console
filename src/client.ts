import { createClient } from 'redis'
import { randomUUID } from 'node:crypto'
import { removeConsumerId } from './subscriber.js'
import { CONFIG } from './config.js'

export const client = createClient({
    socket: { port: CONFIG.REDIS_PORT as number, host: CONFIG.REDIS_HOST },
})
export const clientId = randomUUID()

client.on('error', (err) => console.error('Redis Client Error:', err))
client.on('connect', () => console.log('Connected successfully'))
client.on('ready', () => console.log('Client is ready for use'))
client.on('end', () => console.log('Client connection has closed.'))

export async function connectRedis() {
    if (!client.isReady && !client.isOpen) {
        try {
            await client.connect()
        } catch (err) {
            console.error('Failed to connect to Redis:', err)
            throw err
        }
    }
}

const shutdown = async () => {
    try {
        await removeConsumerId(clientId)
        await client.quit()
    } catch (e: unknown) {
        console.error(`Error during shutdown: ${e}`)
    } finally {
        process.exit(0)
    }
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
