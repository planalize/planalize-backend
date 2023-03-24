import Fastify from 'fastify';

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

	await fastiy.register(import('@fastify/sensible'));
	await fastiy.register(import('./plugins'));

	return fastiy;
};
