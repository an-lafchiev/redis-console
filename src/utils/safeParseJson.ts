import { z } from 'zod'
import type { SafeJsonParseResult } from '../types/index.js'

export const safeParseJson = <T>(
    schema: z.ZodType<T>,
    jsonString: string
): SafeJsonParseResult<T> => {
    try {
        const parsed = JSON.parse(jsonString)
        const result = schema.safeParse(parsed)
        if (result.success) {
            return { success: true, data: result.data }
        } else {
            return { success: false, error: result.error }
        }
    } catch (e) {
        return {
            success: false,
            error: e instanceof Error ? e : new Error('Invalid JSON string'),
        }
    }
}
