/* eslint-disable prefer-const */
import { client, clientId, shutdown } from './client.js'
import { processMessage } from './utils/processMessage.js'

export async function createTransformer() {
    const connection = client.duplicate()
    await connection.connect()

    const maxRetries = 3
    while (true) {
        const shouldBreak = await processMessage(connection)
        if (shouldBreak) break
    }

    console.log(`No messages received after ${maxRetries} retries. Disconnecting. ${clientId}`)
    connection.quit()
    await shutdown()
}
