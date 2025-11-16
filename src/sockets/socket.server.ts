import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { logger } from '../utils/logger';
import { chatGateway } from '../modules/chat/chat.gateway';


export function createSocketServer(httpServer: HttpServer) {
const io = new Server(httpServer, {
cors: { origin: '*' }
});


io.on('connection', (socket: Socket) => {
logger.info(`socket connected: ${socket.id}`);


// bind chat gateway events
chatGateway(io, socket);


socket.on('disconnect', (reason) => {
logger.info(`socket disconnected ${socket.id} reason=${reason}`);
});
});


return io;
}