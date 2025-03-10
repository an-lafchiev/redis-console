import { fork } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { CONFIG } from './config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

for (let i = 0; i < CONFIG.NUMBER_OF_CONSUMERS; i++) {
    const consumerPath = join(__dirname, 'consumer.js')
    fork(consumerPath)
}
