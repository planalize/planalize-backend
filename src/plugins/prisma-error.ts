import { Prisma } from '@prisma/client';
import fp from 'fastify-plugin';

import type { HttpErrorNames } from '@fastify/sensible/lib/httpError';
import type { FastifyPluginCallback } from 'fastify';

type PrismaError = (
	error: unknown,
	data?: Partial<Record<HttpErrorNames, string>>
) => unknown;

declare module 'fastify' {
	interface FastifyInstance {
		prismaError: PrismaError;
	}
}

const prismaErrorPlugin: FastifyPluginCallback = (fastify, _options, done) => {
	fastify.decorate<PrismaError>('prismaError', (error, data) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			switch (error.code) {
				case 'P2002':
					return fastify.httpErrors.conflict(data?.conflict);
				case 'P2025':
					return fastify.httpErrors.notFound(data?.notFound);
				default:
					return fastify.httpErrors.internalServerError();
			}
		}

		return error;
	});

	done();
};

export default fp(prismaErrorPlugin);
