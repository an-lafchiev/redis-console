import { client } from './client.js'

let processedMessagesCount = 0
let startTime: number | null = null

export function logProcessedMessages() {
    if (startTime === null) {
        return
    }

    const elapsedTimeInSeconds = (performance.now() - startTime) / 1000
    const messagesPerSecond = processedMessagesCount / elapsedTimeInSeconds
    console.log(
        `Processed messages: ${processedMessagesCount}, Messages per second: ${messagesPerSecond}`
    )
}

export function incrementProcessedMessages() {
    processedMessagesCount++
}

export function setStartTime() {
    if (startTime === null) {
        startTime = performance.now()
    }
}

export function startLogging() {
    setInterval(logProcessedMessages, 3000)
    setInterval(logGlobalMessages, 3000)
}

async function logGlobalMessages() {
    const totalMessages = await client.get('global:processedMessages')

    if (startTime === null) {
        return
    }
    const elapsedTimeInSeconds = (performance.now() - startTime) / 1000

    if (totalMessages) {
        const globalThroughput = parseInt(totalMessages) / elapsedTimeInSeconds
        console.log(`Global throughput: ${globalThroughput.toFixed(2)} messages/second`)
    }
}
