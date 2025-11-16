import { buildApp } from './app';
import { createSocketServer } from './sockets/socket.server';
import { logger } from './utils/logger';


const PORT = Number(process.env.PORT || 4000);


async function main() {
const app = buildApp();
const server = await app.listen({ port: PORT, host: '0.0.0.0' });
logger.info(`HTTP server listening on ${server}`);


// attach sockets
createSocketServer(app.server);
}


main().catch((err) => {
logger.error(err);
process.exit(1);
});