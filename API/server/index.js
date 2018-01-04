import failfast from 'fp-error-handling';
import Fastify from 'fastify';
import routes from './routes';

const port = 9000;
const fastify = Fastify({
  logger: true
});

// Declare a route
fastify.register(routes);

const onError = err => {
  throw err
};

const onSuccess = () => {
  const message = `API server listening on port ${fastify.server.address().port}`;
  fastify.log.info(message);
};

// Run the server!
fastify.listen(port, failfast(onError, onSuccess));
