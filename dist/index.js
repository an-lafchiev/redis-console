import { client, connectRedis } from './client.js';
import { CHANNEL } from './contants.js';
const startConsumer = async () => {
    await connectRedis();
    client.subscribe(CHANNEL, (message, channel) => {
        console.log(`${CHANNEL} subscriber collected message: ${message} from channel: ${channel}`);
    });
};
startConsumer().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=index.js.map