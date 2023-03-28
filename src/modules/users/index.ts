import { userSchema } from './users.schemas';
import { createUsersService } from './users.service';

import type { FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
	interface FastifyInstance {
		usersService: ReturnType<typeof createUsersService>;
	}
}

const usersPlugin: FastifyPluginAsync = async (fastify) => {
	fastify.decorate('usersService', createUsersService(fastify));
	fastify.addSchema(userSchema);

	await fastify.register(import('./users.routes'), { prefix: '/users' });
};

export default usersPlugin;
