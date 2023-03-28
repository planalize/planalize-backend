import Fastify from 'fastify';

import { openAPIHttpErrorSchema } from './schemas';

export const createServer = async () => {
	const fastiy = Fastify({
		logger:
			process.env.NODE_ENV === 'production'
				? true
				: {
						transport: {
							target: 'pino-pretty',
							options: {
								translateTime: 'SYS:HH:MM:ss',
								ignore: 'hostname,pid',
							},
						},
				  },
	});

	fastiy.addSchema(openAPIHttpErrorSchema);

	await fastiy.register(import('@fastify/sensible'));
	await fastiy.register(import('./plugins'));
	await fastiy.register(import('./modules'));

	return fastiy;
};
