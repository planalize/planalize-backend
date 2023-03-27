import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyPluginAsync } from 'fastify';

const swaggerPlugin: FastifyPluginAsync = async (fastify) => {
	await fastify.register(fastifySwagger, {
		openapi: {
			info: {
				title: 'Planalize Rest API documentation',
				version: '0.0.1',
			},
		},
	});

	await fastify.register(fastifySwaggerUi, {
		routePrefix: '/docs',
	});
};

export default fastifyPlugin(swaggerPlugin);
