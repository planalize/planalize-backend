import { Type } from '@sinclair/typebox';
import { fastifyPlugin } from 'fastify-plugin';

import type { Static } from '@sinclair/typebox';
import type { FastifyPluginAsync } from 'fastify';

const schema = Type.Object({
	HOSTNAME: Type.String(),
	PORT: Type.Number(),
});

declare module 'fastify' {
	interface FastifyInstance {
		config: Static<typeof schema>;
	}
}

const envPlugin: FastifyPluginAsync = async (fastify) => {
	await fastify.register(import('@fastify/env'), {
		schema,
		dotenv: true,
	});
};

export default fastifyPlugin(envPlugin);
