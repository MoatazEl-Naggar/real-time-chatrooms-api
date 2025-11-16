import Fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import { logger } from './utils/logger';
import { roomsRoutes } from './modules/rooms/rooms.routes';
import { usersRoutes } from './modules/users/users.routes';


export function buildApp() {
const app = Fastify({ logger: logger });


app.register(fastifyJwt, { secret: process.env.JWT_SECRET || 'dev-secret' });


// register routes
app.register(roomsRoutes, { prefix: '/api/rooms' });
app.register(usersRoutes, { prefix: '/api/users' });


return app;
}