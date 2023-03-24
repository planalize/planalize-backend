import type { TSchema } from '@sinclair/typebox';
import type { FastifySchema } from 'fastify';
import type { StatusCodes } from 'http-status-codes';

export type FastifySchemaTypebox = Partial<
	Omit<Record<keyof FastifySchema, TSchema>, 'response'>
> & { response?: Partial<Record<`${StatusCodes}`, TSchema>> };
