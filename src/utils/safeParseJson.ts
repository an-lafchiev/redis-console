import { z, ZodError } from 'zod'

interface SafeParseJsonSuccess<T> {
    success: true
    data: T
}

interface SafeParseJsonFailure {
    success: false
    error: ZodError | Error
}

export type SafeParseJsonResult<T> = SafeParseJsonSuccess<T> | SafeParseJsonFailure

export const safeParseJson = <T>(
    schema: z.ZodType<T>,
    jsonString: string
): SafeParseJsonResult<T> => {
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
