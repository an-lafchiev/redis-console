import { describe, it, expect } from 'vitest'
import { handleMessage } from '../src/utils/handleMessage'
import { safeParseJson } from '../src/utils/safeParseJson'
import { ZodError } from 'zod'
import { messageSchema } from '../src/validations'

describe('Receive publisher message', () => {
    it('should successfully parse a json message', () => {
        const rawMessage = '{"message_id": "0ae34cce-5e91-4fce-904e-5d9eaa971744"}'
        const result = safeParseJson(messageSchema, rawMessage)

        expect(result.success).toBe(true)
        expect(result.data).toEqual({ message_id: '0ae34cce-5e91-4fce-904e-5d9eaa971744' })
        expect(result.data['message_id']).toHaveLength(36)
    })
    it('should return an error on invalid message format', () => {
        const firstMessage = '{"message_id": "23"}'
        const result = safeParseJson(messageSchema, firstMessage)

        expect(result.success).toBe(false)
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error?.message).toBeDefined()

        const secondMessage = '{"messageId": "0ae34cce-5e91-4fce-904e-5d9eaa971744"}'
        const result2 = safeParseJson(messageSchema, secondMessage)

        expect(result2.success).toBe(false)
        expect(result2.error).toBeInstanceOf(ZodError)
        expect(result2.error?.message).toBeDefined()
    })
    it('should return an error on invalid JSON message', () => {
        const message = "{messageId: '23'}"
        const result = safeParseJson(messageSchema, message)

        expect(result.success).toBe(false)
        expect(result.error).toBeInstanceOf(SyntaxError)
        expect(result.error?.message).toBeDefined()
    })
    it.skip('should return a message', () => {
        const message = { message_id: '8835135d-c7f5-43fc-9b35-4b5cb019c966' }
        const result = handleMessage(message)
    })
})
