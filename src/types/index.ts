import { ZodError } from 'zod'

interface SafeJsonParseSuccess<T> {
    success: true
    data: T
}

interface SafeJsonParseFailure {
    success: false
    error: ZodError | Error
}

export type SafeJsonParseResult<T> = SafeJsonParseSuccess<T> | SafeJsonParseFailure

export interface SortedSetEntry {
    value: string
    score: number
}
