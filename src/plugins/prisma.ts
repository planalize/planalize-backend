import { PrismaClient } from '@prisma/client';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}

const prismaPlugin: FastifyPluginAsync = async (fastify) => {
	const prisma = new PrismaClient();

	await prisma.$connect();

	fastify.decorate('prisma', prisma);

	fastify.addHook('onClose', async (fastify) => {
		await fastify.prisma.$disconnect();
	});
};

export default fastifyPlugin(prismaPlugin);
