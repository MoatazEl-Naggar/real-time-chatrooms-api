import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersService } from './users.service';


export class UsersController {
service = new UsersService();


async register(req: FastifyRequest, reply: FastifyReply) {
const body = req.body as any;
const user = await this.service.create(body.email, body.password, body.name);
return reply.code(201).send({ user: { id: user.id, email: user.email, name: user.name } });
}


async login(req: FastifyRequest, reply: FastifyReply) {
const body = req.body as any;
const token = await this.service.login(body.email, body.password, (req as any).jwtSign);
return reply.send({ token });
}
}