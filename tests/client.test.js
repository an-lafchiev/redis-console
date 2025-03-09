import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { client, connectRedis } from './src/client'

describe('Redis Client', () => {
    beforeAll(async () => {
        await connectRedis()

        await new Promise((resolve) => {
            if (client.isReady) resolve()
            else client.on('ready', resolve)
        })
    })

    afterAll(async () => {
        await client.quit()
    })

    it('should open the client socket', () => {
        expect(client.isOpen).toBe(true)
    })

    it('should be ready to receive and send commands', () => {
        expect(client.isReady).toBe(true)
    })

    it('should be able to set and get a value', async () => {
        await client.set('test:forUse', 'hello')
        const value = await client.get('test:forUse')
        expect(value).toBe('hello')
    })

    it('should unlink a key successfully', async () => {
        await client.set('test:forDelete', 'temporary')
        await client.unlink('test:forDelete')
        const value = await client.get('test:forDelete')
        expect(value).toBeNull()
    })
})
