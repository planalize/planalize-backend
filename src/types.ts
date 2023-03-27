import type { TSchema } from '@sinclair/typebox';
import type { FastifySchema } from 'fastify';
import type { StatusCodes } from 'http-status-codes';

type FastifySchemaKeys = 'body' | 'querystring' | 'params' | 'headers';

export type FastifySchemaTypebox = Partial<
	Record<FastifySchemaKeys, TSchema> &
		Omit<FastifySchema, FastifySchemaKeys | 'response'>
> & { response?: Partial<Record<`${StatusCodes}`, TSchema>> };
