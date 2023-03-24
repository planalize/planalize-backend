import { createServer } from './server';

const start = async () => {
	const server = await createServer();

	try {
		await server.listen({
			host: server.config.HOSTNAME,
			port: server.config.PORT,
		});
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
