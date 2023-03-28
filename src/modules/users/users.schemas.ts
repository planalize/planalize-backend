import { Type } from '@sinclair/typebox';

import { openAPIHttpErrorSchema } from '@/schemas';

import type { Static } from '@sinclair/typebox';

import type { FastifySchemaTypebox } from '@/types';

export const userSchema = Type.Object(
	{
		id: Type.Number(),
		email: Type.String({ format: 'email' }),
	},
	{ $id: 'User' }
);

export const createUserSchema = {
	tags: ['Users'],
	body: Type.Object({
		email: Type.String({ format: 'email' }),
		password: Type.String(),
	}),
	response: {
		201: Type.Ref(userSchema),
		409: Type.Ref(openAPIHttpErrorSchema),
	},
} satisfies FastifySchemaTypebox;

export type CreateUserPayload = Static<(typeof createUserSchema)['body']>;
