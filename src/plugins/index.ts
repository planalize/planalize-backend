import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyPluginAsync } from 'fastify';

const plugins: FastifyPluginAsync = async (fastify) => {
	await fastify.register(import('./env'));
	await fastify.register(import('./prisma'));
	await fastify.register(import('./prisma-error'));
	await fastify.register(import('./swagger'));
};

export default fastifyPlugin(plugins);
