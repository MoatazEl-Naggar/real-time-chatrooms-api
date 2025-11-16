import { FastifyPluginAsync } from 'fastify';
import { UsersController } from './users.controller';


export const usersRoutes: FastifyPluginAsync = async (app) => {
const ctrl = new UsersController();


app.post('/register', async (req, reply) => ctrl.register(req, reply));
app.post('/login', async (req, reply) => ctrl.login(req, reply));
};