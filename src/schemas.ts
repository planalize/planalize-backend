import { Type } from '@sinclair/typebox';

export const openAPIHttpErrorSchema = Type.Object(
	{
		statusCode: Type.Number(),
		error: Type.String(),
		message: Type.String(),
	},
	{ $id: 'OpenAPIHttpError' }
);
