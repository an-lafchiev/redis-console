import { Command } from 'commander'
import { CHANNEL_KEY, CONSUMER_LIST, PROCESSED_MESSAGES_KEY } from './contants.js'
const program = new Command()

program.option('-c, --consumers <number>', 'Number of consumers', parseInt).parse(process.argv)

const options = program.opts()

export const CONFIG = {
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    NUMBER_OF_CONSUMERS: options.consumers || 1,
}
