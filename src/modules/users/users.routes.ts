import { StatusCodes } from 'http-status-codes';

import { createUserSchema } from './users.schemas';

import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const usersRoutesPlugin: FastifyPluginCallbackTypebox = (
	fastify,
	_options,
	done
) => {
	const { usersService } = fastify;

	fastify.route({
		url: '/',
		method: 'POST',
		schema: createUserSchema,
		handler: async (request, reply) => {
			reply
				.code(StatusCodes.CREATED)
				.send(await usersService.createUser(request.body));
		},
	});

	done();
};

export default usersRoutesPlugin;
