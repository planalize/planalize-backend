import { hash } from 'bcrypt';

import type { CreateUserPayload } from './users.schemas';
import type { FastifyInstance } from 'fastify';

export const createUsersService = ({
	prisma,
	prismaError,
	config,
}: FastifyInstance) => ({
	async createUser({ email, password }: CreateUserPayload) {
		try {
			return await prisma.user.create({
				data: { email, password: await hash(password, config.SALT_OR_ROUNDS) },
				select: { id: true, email: true },
			});
		} catch (err) {
			throw prismaError(err, {
				conflict: 'User already exists.',
			});
		}
	},
});
