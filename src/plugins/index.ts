import fp from 'fastify-plugin';

import type { FastifyPluginAsync } from 'fastify';

const plugins: FastifyPluginAsync = async (fastify) => {
	await fastify.register(import('./env'));
	await fastify.register(import('./prisma'));
	await fastify.register(import('./prisma-error'));
};

export default fp(plugins);