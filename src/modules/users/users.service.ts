import { prisma } from '../../config/prisma';
import bcrypt from 'bcrypt';


export class UsersService {
async create(email: string, password: string, name?: string) {
const hashed = await bcrypt.hash(password, 10);
return prisma.user.create({ data: { email, password: hashed, name } });
}


async login(email: string, password: string, jwtSign?: any) {
const user = await prisma.user.findUnique({ where: { email } });
if (!user) throw new Error('Invalid credentials');
const ok = await bcrypt.compare(password, user.password);
if (!ok) throw new Error('Invalid credentials');
if (!jwtSign) throw new Error('JWT not available');
const token = await jwtSign({ id: user.id, email: user.email });
return token;
}
}