import { createClient } from 'redis'
import { CONSUMER_LIST, PROCESSED_MESSAGES_KEY } from './contants.js'
import { randomUUID } from 'node:crypto'

export const client = createClient({
    socket: { port: 6379, host: '127.0.0.1' },
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

process.on('SIGINT', async () => {
    console.log('Closing Redis connections...')
    console.log(await client.xLen(PROCESSED_MESSAGES_KEY))
    await client.lRem(CONSUMER_LIST, 0, clientId)
    await client.quit()
    process.exit(0)
})
